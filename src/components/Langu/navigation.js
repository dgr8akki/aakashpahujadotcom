import React from 'react';
import { Link } from 'gatsby';
import LocalizedLink from './localizedLink';
import useTranslations from './useTranslations';

const Navigation = () => {
  const { backToHome } = useTranslations();

  return (
    <div>
      HII
      <LocalizedLink to="/" aria-label={backToHome}>
        Homepage
      </LocalizedLink>
      <div>
        <Link to="/" hrefLang="en">
          English
        </Link>
        {` `}/{` `}
        <Link to="/de" hrefLang="de">
          Deutsch
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
