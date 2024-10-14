import React from 'react'
import { useTranslation } from "react-i18next";
import "./topTitle.css"
const TopTitle = () => {
    const {t} = useTranslation();
  return (
    <div className='container'>
    <div className="top-title py-4 px-2">
    <div className="d-flex flex-wrap justify-content-between align-items-center">
      <div className="col-md-7 mb-1">
        <div>
          <h3 className="fs-4 fw-bold">{t('topTitle.titleHead')}</h3>
          <p className="lead-title fs-t6 mb-0">{t('topTitle.titleParagraph')}</p>
          <div className="lead-title fs-t6 ">{t('topTitle.titleParagraph2')}</div> {/* condition */}
        </div>
      </div>
    </div>
    <div className="border bg-light mb-1" style={{ fontSize: '12.5px' }}>
      <p className="p-2 m-0">
      {t('topTitle.titleBody1')}{" "}
        <a
        style={{ fontSize: '12.5px' }}
          className="lang-switch"
          target="_blanck"
          href="https://www.argaam.com/en/static-contents/privacypolicy"
        >
        {t('topTitle.titleLink1')}
        </a>{" "}
        {t('topTitle.titleAnd')} {" "}
        <a
        style={{ fontSize: '12.5px' }}
          className="lang-switch"
          target="_blanck"
          href="https://www.argaam.com/en/static-contents/termsandconditions"
        >
          {t('topTitle.titleLink2')}
        </a>
        {t('topTitle.titleBody2')}
      </p>
    </div>
  </div>
  </div>
  )
}

export default TopTitle
