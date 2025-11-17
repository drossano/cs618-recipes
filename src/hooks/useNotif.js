import { useEffect } from "react";
import { socket } from "../App.jsx";

export function useNotif() {
  function receiveRecipe(recipe) {
    console.log(recipe);
    return recipe;
  }
  useEffect(() => {
    socket.on("recipe.add", receiveRecipe);
    return () => socket.off("recipe.add", receiveRecipe);
  });
  function sendRecipe() {
    socket.emit("recipe.add", "recipe added");
  }
  return { sendRecipe };
}
