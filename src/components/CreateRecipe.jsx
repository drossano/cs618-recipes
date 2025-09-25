import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createRecipe } from "../api/recipes.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export function CreateRecipe() {
  const [token] = useAuth();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");
  const queryClient = useQueryClient();
  const createRecipeMutation = useMutation({
    mutationFn: () =>
      createRecipe(token, {
        name: name,
        ingredients: ingredients,
        steps: steps,
        image: image,
      }),
    onSuccess: () => queryClient.invalidateQueries(["recipes"]),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createRecipeMutation.mutate();
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
      <input
        type="submit"
        value={createRecipeMutation.isPending ? "Creating..." : "Create"}
        disabled={!name || createRecipeMutation.isPending}
      />
    </form>
  );
}
