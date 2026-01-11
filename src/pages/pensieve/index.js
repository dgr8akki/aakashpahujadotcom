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

  a {
    ${mixins.inlineLink};
  }

  h1 {
    ${mixins.flexBetween};
    margin-bottom: 50px;

    a {
      font-size: ${fontSizes.lg};
      font-weight: 400;
    }
  }

  ul {
    li {
      font-size: 24px;
      h2 {
        font-size: inherit;
        margin: 0;
        a {
          color: ${colors.lightSlate};
        }
      }
      .subtitle {
        color: ${colors.slate};
        font-size: ${fontSizes.sm};

        .tag {
          margin-right: 10px;
        }
      }
    }
  }
`;

const PensievePage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO title="Blog | Aakash Pahuja" description="Thoughts, learnings, and perspectives on software engineering, AI, and technology from a senior software engineer." pathname="/pensieve" />
      <StyledMainContainer>
        <header>
          <h1 className="big-title">Blog</h1>
          <p className="subtitle">
            <Link to="/pensieve/tags">View all tags</Link>
          </p>
        </header>

        <ul className="fancy-list">
          {posts.map(({ node }, i) => {
            const { frontmatter } = node;
            const { title, slug, date, tags } = frontmatter;
            return (
              <li key={i}>
                <h2>
                  <Link to={slug}>{title}</Link>
                </h2>
                <p className="subtitle">
                  <time>
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>&nbsp;&mdash;&nbsp;</span>
                  {tags &&
                    tags.length > 0 &&
                    tags.map((tag, i) => (
                      <Link key={i} to={`/pensieve/tags/${kebabCase(tag)}/`} className="tag">
                        #{tag}
                      </Link>
                    ))}
                </p>
              </li>
            );
          })}
        </ul>
      </StyledMainContainer>
    </Layout>
  );
};

PensievePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default PensievePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date
            tags
          }
        }
      }
    }
  }
`;
