import React from "react";
import photo from "../../assets/cardphoto.png";
import "./Card.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
const Card = ({data}) => {
  const {t , i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <>
      <div className="container">
        <div className="new-letter-card bg-light rounded-2">
          <div className="row justify-content-between p-2 m-0 py-3 mb-3">
            {data?.map((item) => (
                 <div className="col-md-12 col-lg-6 mb-2" key={item.preferenceID}>
                 <div className="card rounded-0 h-100">
                   <div className="row g-0 h-100">
                     <div className="col-md-5">
                       <img
                         src={item.thumbnail}
                         className="img-fluid "
                         alt="..."
                         style={{ height: "100%", objectFit: "cover" }}
                       />
                     </div>
                     <div className="col-md-7">
                       <div
                         className="card-body h-100 d-flex flex-column justify-content-between"
                       >
                         <div>
                           <h4 className="mb-1 fw-bold">
                           {lang === 'en' ? item.nameEn : item.nameAr}
                           </h4>
                           <img
                             className={item.countryFlag ? `flag-img img-fluid mt-0` : `flag-img img-fluid mt-0 mx-0` }
                            src={item.countryFlag ? item.countryFlag : ""}
                             draggable="false"
                           />
                           <span>{lang === 'en' ? item.tagsEn : item.tagsAr}</span>
                           <p className="p-0 m-0 mb-1 mt-1">
                           {
                             lang === 'en' ? item.descriptionEn : item.descriptionAr
                           }
                           </p>
                         </div>
                         <div className="d-flex justify-content-between align-items-center">
                           <div className="d-flex justify-content-center align-items-center mt-2">
                          {item.availableLangId !== 0 && 
                             <a className="lang-switch" href={lang === 'en' ? 'ar' : 'en'}>
                             {t('card.available')}
                             </a>
                             } 
                           </div>
                           
                           <button
                             className="btn btn-outline-dark btn-sm mt-2"
                             data-bs-toggle="offcanvas"
                             data-bs-target="#offcanvasNewsletter"
                             aria-controls="offcanvasNewsletter"
                           >
                             <i className="fa-solid fa-plus mx-1"></i>{t('card.subscribe')}
                             </button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
