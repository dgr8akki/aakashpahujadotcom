import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Layout, SEO } from '@components';
import styled from 'styled-components';
import { theme, mixins, Main } from '@styles';
const { colors, fontSizes } = theme;

const StyledMainContainer = styled(Main)`
  max-width: 1000px;

  h1 {
    margin-bottom: 50px;
  }

  ul {
    color: ${colors.lightSlate};
    li {
      font-size: ${fontSizes.xxl};

      a {
        ${mixins.inlineLink};
        color: ${colors.lightSlate};

        .count {
          color: ${colors.slate};
          font-family: ${theme.fonts.SFMono};
          font-size: ${fontSizes.md};
        }
      }
    }
  }
`;

const TagsPage = ({
  location,
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <Layout location={location}>
    <SEO title="Blog Tags | Aakash Pahuja" description="Browse blog posts by topic and category." pathname="/pensieve/tags" />
    <StyledMainContainer>
      <span className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link to="/pensieve">All posts</Link>
      </span>

      <h1 className="big-title">Tags</h1>

      <ul className="fancy-list">
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/pensieve/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} <span className="count">({tag.totalCount})</span>
            </Link>
          </li>
        ))}
      </ul>
    </StyledMainContainer>
  </Layout>
);

TagsPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
    }),
  }),
};

export default TagsPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
