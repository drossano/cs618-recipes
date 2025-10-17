import { useAuth } from "../contexts/AuthContext.jsx";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { likeRecipe, getTotalLikes } from "../api/likes.js";
1;
import { useState } from "react";

export function Likes({ recipeId }) {
  const totalLikes = useQuery({
    queryKey: ["totalLikes", recipeId],
    queryFn: () => getTotalLikes(recipeId),
  });
  const [token] = useAuth();
  const [session, setSession] = useState();
  const likeRecipeMutation = useMutation({
    mutationFn: () => likeRecipe(token, { recipeId }, session),
    onSuccess: (data) => setSession(data?.session),
  });
  const handleLike = (e) => {
    e.preventDefault();
    likeRecipeMutation.mutate();
  };

  if (!token) return <button>❤️ {totalLikes.data?.likes}</button>;
  return <button onClick={handleLike}>❤️ {totalLikes.data?.likes}</button>;
}

Likes.propTypes = {
  recipeId: PropTypes.string,
};
