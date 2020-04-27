import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { LocaleContext } from './../layout';

const useTranslations = () => {
  // // Grab the locale (passed through context) from the Context Provider
  // const { locale } = React.useContext(LocaleContext);
  // // Query the JSON files in <rootDir>/i18n/translations
  // const { rawData } = useStaticQuery(query);
  //
  // // Simplify the response from GraphQL
  // const simplified = rawData.edges.map(item => ({
  //   name: item.node.name,
  //   translations: item.node.translations,
  // }));
  //
  // // Only return translations for the current locale
  // const { translations } = simplified.filter(lang => lang.name === locale)[0];
  //
  // return translations;
};

export default useTranslations;

const query = graphql`
  query useTranslations {
    rawData: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/translations/" } }) {
      edges {
        node {
          frontmatter {
            subline
            hello
            backToHome
          }
        }
      }
    }
  }
`;
