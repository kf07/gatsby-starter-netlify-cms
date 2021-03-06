module.exports = {
  siteMetadata: {
    title: 'Gatsby + Netlify CMS Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
            {
                resolve: `gatsby-remark-prismjs`,
                options: {
                    classPrefix: "language-",
                    inlineCodeMarker: null,
                    aliases: {},
                    showLineNumbers: true,
                    noInlineHighlight: false,
                },
            },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-128951871-1',
      }
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
    'gatsby-plugin-styled-components'
  ],
}
