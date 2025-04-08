import { gql } from 'apollo-angular';

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      title
      price
      images
    }
  }
`;
