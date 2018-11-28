import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import styled from 'styled-components';
import media from 'styled-media-query';

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
            </div>
            <ArticleList>
            {posts
              .map(({ node: post }) => (
                <ArticleItem>
                  <Link className="ArticleLink" to={post.fields.slug}>
                    <Article className="content" key={post.id}>
                        <BlogImage><img src={post.frontmatter.image} /></BlogImage>
                        <BlogText>
                        <p className="has-text-primary blog-title">
                            {post.frontmatter.title}
                        </p>
                      <ArticleDate>{post.frontmatter.date}</ArticleDate>
                        </BlogText>
                    </Article>
                  </Link>
                </ArticleItem>
              ))}
            </ArticleList>
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

const BlogImage = styled.div`
`

const ArticleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const BlogText = styled.div`
  min-height: 83px;
`

const ArticleDate = styled.small`
  color: #333;
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 16px;
`

const ArticleItem = styled.li`
  width: 32.3%;
  margin: 0 0 20px;
  border: 1px solid #eaecee;
  position: relative;
  &:not(:nth-child(3n)){
    margin: 0 1.55% 0 0;
    ${media.lessThan("medium")`
      margin: 0 0 15px;
    `}
  }
${media.lessThan("medium")`
    width: 100%;
    margin: 0 0 15px;
  `}
`;

const Article = styled.article`
 padding: 1em 1em;
`

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY.MM.DD")
            image
          }
        }
      }
    }
  }
`
