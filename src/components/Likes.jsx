import { useAuth } from "../contexts/AuthContext.jsx";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { likeRecipe } from "../api/likes.js";
import { useState } from "react";

export function Likes(recipeId) {
  const [token] = useAuth();
  const [session, setSession] = useState();
  const likeRecipeMutation = useMutation({
    mutationFn: () => likeRecipe(token, recipeId, session),
    onSuccess: (data) => setSession(data?.session),
  });
  const handleLike = (e) => {
    e.preventDefault();
    likeRecipeMutation.mutate();
  };

  if (!token) return <button>Like</button>;
  return <button onClick={handleLike}>Like</button>;
}

Likes.propTypes = {
  likes: PropTypes.array,
  recipeId: PropTypes.string,
};
