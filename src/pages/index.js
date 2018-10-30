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
              <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
            </div>
            <ArticleList>
            {posts
              .map(({ node: post }) => (
                <ArticleItem><Article
                  className="content"
                  key={post.id}
                >
                  <p>
                      <BlogImage><img src={post.frontmatter.image} /></BlogImage>
                      <Link className="has-text-primary" to={post.fields.slug}>
                          {post.frontmatter.title}
                      </Link>
                      <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <br />
                    <br />
                    <Link className="button is-small" to={post.fields.slug}>
                      続きを読む
                    </Link>
                  </p>
                </Article>
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
  justify-content: space-between;;
`

const ArticleItem = styled.li`
  width: 32.3%;
  margin: 0 0 20px;
  border: 1px solid #eaecee;
${media.lessThan("medium")`
    width: 100%;
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
            date(formatString: "MMMM DD, YYYY")
            image
          }
        }
      }
    }
  }
`
