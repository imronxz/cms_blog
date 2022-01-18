//! graphql
import { GraphQLClient, request, gql } from 'graphql-request';
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

/** @getRecentPost {async}
 *  @GetPostDetails {function, (post)}: get post details
 *  @orderBy {object} : createdAt_ASC ,last: 3
 *  @title: title of post
 *  @thumbnailImage : url, of thumbnail image
 *  @createdAt : createdAt of post
 *  @slug : url of post
 */
export const postinganTerbaru = async () => {
  const query = gql`
  query GetPostDetails(){
    posts(
        orderBy: createdAt_ASC, 
        last: 3
    ){
      title
      thumbnailImage{
        url
      }
      createdAt
      slug
    }
  }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const postinganTerkait = async () => {
  const query = gql`
    query GetPostDetails($slug: String!, $kategoris: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { kategoris_some: { slug_in: $kategoris } } }
        last: 3
      ) {
        title
        thumbnailImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
};
