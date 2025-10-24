import { gql } from "@apollo/client/core/index.js";

export const GET_RECIPES = gql`
  query getRecipes {
    recipes {
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
