import React, { Fragment, useEffect, useState } from "react";
import "./Card.css";
import { useTranslation } from "react-i18next";
import { useApiQuery } from "../../Services/useApiQuery";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Slide } from "react-toastify";

const Card = ({ dataNews }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [otpData, setOtpData] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false); 
  const [otpCode, setOtpCode] = useState(new Array(6).fill("")); 
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [triggerVerify, setTriggerVerify] = useState(false); 
  const [buttonClass, setButtonClass] = useState("subscribe");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (email) {
      setError(null);
      setTriggerFetch(true);
    } else {
      setError("Email cannot be empty");
    }
  };

  const { data : otpRequestData } = useApiQuery(triggerFetch ? "otpRequest" : null, email);

  useEffect(() => {
    if (otpRequestData) {
      setOtpData(otpRequestData);
      setIsOtpSent(true);
      setError(null);
      setTriggerFetch(false);

      toast.success(t("card.activate"), {
        position: "top-right",
        autoClose: 800,
        transition: Slide,
      });
    } else if (error) {
      toast.error(t("card.error"), {
        position: "top-right",
        autoClose: 800,
        transition: Slide,
      });
    }
  }, [otpRequestData, error]);
  const handleOtpChange = (value, index) => {
    const otp = [...otpCode];
    otp[index] = value;
    setOtpCode(otp);
  };
  const handlePaste = (e) => {
    e.preventDefault(); 
    const pasteData = e.clipboardData.getData("text").slice(0, 6); 
    const otp = [...otpCode];
    pasteData.split("").forEach((char, index) => {
      if (index < otp.length) {
        otp[index] = char; 
      }
    });
    setOtpCode(otp); 
  };
  
  const handleSubmitOtp = ()  => {
    if (otpData?.regitserVerificationID && otpCode.join("").length === 6) {
      setTriggerVerify(true);
    }
  };

  const { data: verifyData } = useApiQuery(
    triggerVerify ? "getVerify" : null,
    otpData && ( otpData.regitserVerificationID, otpCode.join("") ) 
  );
  
  useEffect(() => {
    if (verifyData) {
      setButtonClass("Unsubscribe bg-outline-danger"); 
      setIsSubscribed(true);
      setTriggerVerify(false);
      toast.success(t("card.otpSuccess"), {
        position: "top-right",
        autoClose: 800,
        transition: Slide,
      });
    }
  }, [verifyData]);

  return (
    <div className="container">
      <ToastContainer />
      <div className="new-letter-card bg-light rounded-2">
        <div className="row justify-content-between p-2 m-0 py-3 mb-3">
          {dataNews?.map((item) => (
            <div className="col-md-12 col-lg-6 mb-2" key={item.preferenceID}>
              <div className="card rounded-0 h-100">
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <img
                      src={item.thumbnail}
                      className="img-fluid"
                      alt="..."
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body h-100 d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="mb-1 fw-bold">
                          {lang === "en" ? item.nameEn : item.nameAr}
                        </h4>
                        <img
                          className={
                            item.countryFlag
                              ? `flag-img img-fluid mt-0`
                              : `flag-img img-fluid mt-0 mx-0`
                          }
                          src={item.countryFlag || ""}
                          alt=""
                          draggable="false"
                        />
                        <span>{lang === "en" ? item.tagsEn : item.tagsAr}</span>
                        <p className="p-0 m-0 mb-1 mt-1">
                          {lang === "en"
                            ? item.descriptionEn
                            : item.descriptionAr}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-center align-items-center mt-2">
                          {item.availableLangId !== 0 && (
                            <a
                              className="lang-switch"
                              href={lang === "en" ? "ar" : "en"}
                            >
                              {t("card.available")}
                            </a>
                          )}
                        </div>

                        <button
                          className={`btn btn-sm mt-2 ${isSubscribed ? 'btn-outline-danger' : 'btn-outline-dark'}`}
                          data-bs-toggle="offcanvas"
                          data-bs-target={`#offcanvasNewsletter-${item.preferenceID}`}
                          aria-controls={`offcanvasNewsletter-${item.preferenceID}`}
                        >
                          <i className="fa-solid fa-plus mx-1"></i>
                          {t("card.subscribe")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="offcanvas offcanvas-bottom "
                tabIndex="-1"
                id={`offcanvasNewsletter-${item.preferenceID}`}
                aria-labelledby={`offcanvasNewsletterLabel-${item.preferenceID}`}
              >
                <div
                  className={`offcanvas-header m-0 pb-0 d-flex ${
                    lang === "en" ? "justify-content-end" : "justify-content-start"
                  } `}
                >
                  <button
                    type="button"
                    className={`btn btn-close-custom `}
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="offcanvas-body small pt-0 mt-0">
                  <div className="container">
                    <h3
                      className="fw-bold-h3"
                      id={`offcanvasNewsletterLabel-${item.preferenceID}`}
                    >
                      {t("card.offcanvasTitle")}
                    </h3>

                    {!isOtpSent ? (
                      <form className="custom-form" onSubmit={handleSubmitEmail}>
                        <div className="row">
                          <div className="col-lg-5 col-md-7 mb-3">
                            <input
                            className="input-email"
                              type="email"
                              name="email"
                              placeholder={t("card.emailEnter")}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-2 col-md-3">
                            <button className="submit-email" type="submit">
                              {t("card.submit")}
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="otp-verification text-center container">
                        <h5 className="my-2 py-0 fw-bold">{t("card.otp")}</h5>
                        <div className="custom-form d-flex justify-content-center align-items-center flex-column ">
                          <div className="d-flex justify-content-center align-items-center" dir={lang === "en" ? "ltr" : "ltr"}>
                          {otpCode.map((code, index) => (
                              <Fragment key={index}>
                                <input
                                 id={`otp-${index}`} 
                                  type="text"
                                  maxLength="1"
                                  value={code}
                                  onPaste={handlePaste} 
                                  onChange={(e) => handleOtpChange(e.target.value, index)}
                                  className="otp-input mx-1"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Backspace' && !code) {
                                      if (index > 0) {
                                        const otp = [...otpCode];
                                        otp[index - 1] = ""; 
                                        setOtpCode(otp);
                                        document.getElementById(`otp-${index - 1}`).focus();
                                      }
                                    }
                                  }}
                                />
                                {index < otpCode.length - 1 && <span>-</span>}
                              </ Fragment>
                            ))}

                            </div>
                            <button 
                              onClick={handleSubmitOtp}
                              className="subscribe" 
                              type="submit" 
                              >
                              {t("card.submit")}
                            </button>
                            </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
