import { useQuery } from "@apollo/client/react/index.js";
import { GET_RECIPES, GET_RECIPES_BY_AUTHOR } from "../api/graphql/recipes.js";
import { RecipeList } from "../components/RecipeList.jsx";
import { CreateRecipe } from "../components/CreateRecipe.jsx";
import { RecipeFilter } from "../components/RecipeFilter.jsx";
import { RecipeSorting } from "../components/RecipeSorting.jsx";
import { useState } from "react";
import { Header } from "../components/Header.jsx";
import { Helmet } from "react-helmet-async";
import "./Blog.css";
import { Status } from "../components/Status.jsx";
import { useSocket } from "../contexts/SocketIOContext.jsx";
export function Blog() {
  const { status } = useSocket();
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
      <Status />
      <br />
      <hr />
      {status === "connected" && (
        <div>
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
          <RecipeList recipes={recipes} />
        </div>
      )}
    </div>
  );
}
