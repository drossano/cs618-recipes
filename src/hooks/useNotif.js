import { useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketIOContext.jsx";

export function useNotif() {
  const { socket } = useSocket();
  const [recipes, setRecipes] = useState([]);
  function receiveRecipe(recipe) {
    setRecipes((recipes) => [...recipes, recipe]);
  }
  useEffect(() => {
    socket.on("recipe.add", receiveRecipe);
    return () => socket.off("recipe.add", receiveRecipe);
  }, []);
  function sendRecipe(recipe) {
    socket.emit("recipe.add", recipe);
  }
  return { recipes, sendRecipe };
}
