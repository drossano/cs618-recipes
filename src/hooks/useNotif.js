import { useEffect } from "react";
import { socket } from "../App.jsx";
import { useState } from "react";
export function useNotif() {
  const [latestRecipe, setLatestRecipe] = useState(null);
  async function receiveRecipe(recipe) {
    setLatestRecipe(recipe);
    console.log(latestRecipe);
  }
  useEffect(() => {
    socket.on("recipe.add", receiveRecipe);
    return () => socket.off("recipe.add", receiveRecipe);
  });
  async function sendRecipe() {
    socket.emit("recipe.add", "recipe added");
  }
  return { sendRecipe, receiveRecipe, latestRecipe };
}
