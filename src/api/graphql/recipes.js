import { gql } from "@apollo/client/core/index.js";

export const GET_RECIPES = gql`
  query getRecipes {
    recipes {
      author {
        username
      }
      id
      name
      ingredients
      steps
      image
      likes {
        user {
          username
        }
      }
      updatedAt
      createdAt
    }
  }
`;
