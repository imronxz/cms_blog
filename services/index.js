//! graphql
import { request, gql } from 'graphql-request';
//! endpoints graphcms
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// TODO: getting API from graphcms query
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            admin {
              bio
              nama
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            kutipan
            thumbnailImage {
              url
            }
            kategoris {
              nama
              stage
            }
          }
        }
      }
    }
  `;
  //TODO:  request(graphqlAPI, query)
  const result = await request(graphqlAPI, query);

  // TODO: return result.postsConnection.edges.map(({ node }) => node);
  return result.postsConnection.edges;
};
