import React from 'react';
import PropTypes from 'prop-types';
import config from '@config';
import ogImage from '@images/og.png';

const SEO = ({ title, description, pathname, children }) => {
  const seo = {
    title: title || config.siteTitle,
    description: description || config.siteDescription,
    url: `${config.siteUrl}${pathname || ''}`,
    image: `${config.siteUrl}${ogImage}`,
  };

  return (
    <>
      <html lang="en" prefix="og: http://ogp.me/ns#" />
      <title>{seo.title}</title>
      <link rel="canonical" href={seo.url} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={config.siteKeywords} />
      {config.googleVerification && (
        <meta name="google-site-verification" content={config.googleVerification} />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:locale" content={config.siteLanguage} />
      
      {/* Schema.org */}
      <meta itemProp="name" content={seo.title} />
      <meta itemProp="description" content={seo.description} />
      <meta itemProp="image" content={seo.image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:site" content={config.twitterHandle} />
      <meta name="twitter:creator" content={config.twitterHandle} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.title} />
      
      {/* Theme */}
      <meta name="msapplication-TileColor" content={config.navyColor} />
      <meta name="theme-color" content={config.navyColor} />
      
      {children}
    </>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  children: PropTypes.node,
};

SEO.defaultProps = {
  title: null,
  description: null,
  pathname: null,
  children: null,
};
