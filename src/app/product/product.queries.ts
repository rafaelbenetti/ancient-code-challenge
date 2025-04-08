import { gql } from 'apollo-angular';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      category {
        name
      }
      images
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;
