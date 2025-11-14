import { useMutation } from "@apollo/client/react/index.js";
import { Link } from "react-router-dom";
import slug from "slug";
import { useState } from "react";
import {
  CREATE_RECIPE,
  GET_RECIPES,
  GET_RECIPES_BY_AUTHOR,
} from "../api/graphql/recipes.js";
import { useAuth } from "../contexts/AuthContext.jsx";
//import { useNotif } from "../hooks/useNotif.js";

export function CreateRecipe() {
  //const { sendRecipe } = useNotif();
  const [token] = useAuth();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");

  const [createRecipe, { loading, data }] = useMutation(CREATE_RECIPE, {
    variables: { name, ingredients, steps, image },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_RECIPES, GET_RECIPES_BY_AUTHOR],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createRecipe();
    //sendRecipe();
  };
  if (!token) return <div>Please log in to create new recipes.</div>;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-name">Name:</label>
        <input
          type="text"
          name="create-name"
          id="create-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor="create-ingredients">Ingredients:</label>
      <textarea
        name="create-ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter each ingredient on a separate line&#10;Eggs&#10;Milk&#10;Sugar"
      />
      <br />
      <label htmlFor="create-steps">Steps:</label>
      <textarea
        name="create-steps"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        placeholder="Enter each step on a separate line&#10;Crack eggs into bowl&#10;Mix in milk and sugar"
      />
      <br />
      <label htmlFor="create-image">Image URL:</label>
      <input
        type="text"
        name="create-image"
        id="create-image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      <br />
      <input type="submit" value={loading ? "Creating..." : "Create"} />
      {data?.createRecipe ? (
        <>
          <br />
          <Link
            to={`/recipes/${data.createRecipe.id}/${slug(
              data.createRecipe.name,
            )}`}
          >
            {data.createRecipe.name}
          </Link>{" "}
          created successfully!
        </>
      ) : null}
    </form>
  );
}
