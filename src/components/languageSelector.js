import React from 'react';

const LanguageSelector = ({ lang, className, changeLanguage }) => (
  <button onClick={() => changeLanguage(lang === 'en' ? 'fr' : 'en')} className={className}>
    {
      lang === 'fr' ? 'English' : 'French'
    }
  </button>
);

export default LanguageSelector;
