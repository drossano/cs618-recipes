import { gql } from "@apollo/client/core/index.js";

export const RECIPE_FIELDS = gql`
  fragment RecipeFields on Recipe {
    id
    name
    steps
    ingredients
    updatedAt
    createdAt
    author {
      username
    }
    likes {
      user {
        username
      }
    }
  }
`;

export const GET_RECIPES = gql`
  ${RECIPE_FIELDS}
  query getRecipes($options: RecipesOptions) {
    recipes(options: $options) {
      ...RecipeFields
    }
  }
`;

export const GET_RECIPES_BY_AUTHOR = gql`
  ${RECIPE_FIELDS}
  query getRecipesByAuthor($author: String!, $options: RecipesOptions) {
    recipesByAuthor(username: $author, options: $options) {
      ...RecipeFields
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $name: String!
    $steps: String
    $ingredients: String
    $image: String
  ) {
    createRecipe(
      name: $name
      ingredients: $ingredients
      steps: $steps
      image: $image
    ) {
      id
      name
    }
  }
`;
