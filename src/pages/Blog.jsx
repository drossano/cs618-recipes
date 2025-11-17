import { useQuery } from "@apollo/client/react/index.js";
import { GET_RECIPES, GET_RECIPES_BY_AUTHOR } from "../api/graphql/recipes.js";
import { RecipeList } from "../components/RecipeList.jsx";
import { CreateRecipe } from "../components/CreateRecipe.jsx";
import { RecipeFilter } from "../components/RecipeFilter.jsx";
import { RecipeSorting } from "../components/RecipeSorting.jsx";
import { useState } from "react";
import { Header } from "../components/Header.jsx";
import { Helmet } from "react-helmet-async";
import { Notification } from "../components/Notification.jsx";
import "./Blog.css";

export function Blog() {
  const [isOpen, setIsOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  const recipesQuery = useQuery(author ? GET_RECIPES_BY_AUTHOR : GET_RECIPES, {
    variables: { author, options: { sortBy, sortOrder } },
  });
  const recipes =
    recipesQuery.data?.recipesByAuthor ?? recipesQuery.data?.recipes ?? [];
  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Cook Book</title>
      </Helmet>
      <Header />
      <br />
      <hr />
      <br />
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      <RecipeFilter
        field="author"
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={["createdAt", "updatedAt", "likes"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <button onClick={() => setIsOpen(true)}>Open Notification</button>
      <Notification open={isOpen} onClose={() => setIsOpen(false)}>
        Fancy Notification
      </Notification>
      <RecipeList recipes={recipes} />
    </div>
  );
}
