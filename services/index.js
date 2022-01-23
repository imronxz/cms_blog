//! @graphqlDoc @
import { request, gql } from 'graphql-request';
//! endpoints graphcms
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// TODO: getting API from graphcms query
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection( orderBy: createdAt_DESC) {
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
              slug
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

/** @postinganbaru @
 *  @postinganTerbaru {slug}
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
        orderBy: createdAt_DESC, 
        first: 3
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
  // request (graphqlAPI dan qeury)
  // return results #postinganbaru
  const result = await request(graphqlAPI, query);
  return result.posts;
};
// TODO: @postinganterkait @

export const postTerkait = async (kategoris, slug) => {
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
  // #postinganterkait dengan param(kategoris, slug)

  const result = await request(graphqlAPI, query, { slug, kategoris });

  return result.posts;
};

// TODO: @kategoripost @
export const postinganKategori = async () => {
  const query = gql`
    query GetPostDetails {
      kategoris {
        nama
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  // graplcms query #kategoripost
  return result.kategoris;
};

// TODO: detailPost
export const detailPost = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(
        where: { slug: $slug }) {
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
          slug
        }
        kontent {
          raw
        }
      }
    }
  `;
  //TODO:  request(graphqlAPI, query)
  const result = await request(graphqlAPI, query, { slug });

  // TODO: return result.postsConnection.edges.map(({ node }) => node);
  return result.post;
};

//TODO: kirimKoment to backend next.js api/komentar
export const kirimKomentar = async (obj) => {
  const result = await fetch('/api/koment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

// TODO: getKomentar to backend next.js api/komentar
export const getKomentar = async (slug) => {
  const query = gql`
    query GetKomentar($slug: String!) {
      koments(where: { post: { slug: $slug } }) {
        nama
        createdAt
        koment
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  // graplcms query #kategoripost
  return result.koments;
};

export const getPostTerkait = async () => {
  const query = gql`
  query GetPostDetails(){
    posts(where: {postTerkait: true}){
    admin{
      nama
      photo{
        url
      }
    }
    thumbnailImage{
      url
    }
    title
    slug
    createdAt
    }
  }`;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getPostinganKategori = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { kategoris_some: { slug: $slug } }) {
        edges {
          cursor
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
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        thumbnailImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
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

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const gambarGraphCMS = async () => {
  const query = gql`
    query GetPostDetails {
      thumbnailImage {
        url
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};
