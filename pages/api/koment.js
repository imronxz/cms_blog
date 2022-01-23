// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPH_CMS_TOKEN_AUTH;

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

export default async function koment(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateKoment(
      $nama: String!,
      $email: String!,
      $koment: String!,
      $slug: String!
    ) {
      createKoment(
        data: {
          nama: $nama,
          email: $email,
          koment: $koment,
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query, req.body);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
}
