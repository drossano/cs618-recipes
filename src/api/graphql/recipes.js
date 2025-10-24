import { gql } from "@apollo/client/core/index.js";

export const GET_RECIPES = gql`
  query getRecipes($options: RecipesOptions) {
    recipes(options: $options) {
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
