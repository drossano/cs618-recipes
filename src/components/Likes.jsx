import { useAuth } from "../contexts/AuthContext.jsx";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  likeRecipe,
  unlikeRecipe,
  getTotalLikes,
  getLikeByRecipeAndUserIds,
} from "../api/likes.js";
1;
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export function Likes({ recipeId }) {
  //const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();
  const totalLikes = useQuery({
    queryKey: ["totalLikes", recipeId],
    queryFn: () => getTotalLikes(recipeId),
  });

  const [token] = useAuth();
  const [session, setSession] = useState();
  let sub = null;
  if (token) {
    sub = jwtDecode(token).sub;
  }

  const isLiked = useQuery({
    queryKey: ["isLiked", sub, recipeId],
    queryFn: () => getLikeByRecipeAndUserIds(sub, recipeId),
  });
  const likeRecipeMutation = useMutation({
    mutationFn: () => likeRecipe(token, { recipeId }, session),
    onSuccess: (data) => {
      setSession(data?.session),
        queryClient.invalidateQueries(["totalLikes", "IsLiked"]);
    },
  });
  const unlikeRecipeMutation = useMutation({
    mutationFn: () => unlikeRecipe(token, sub, recipeId),
    onSuccess: (data) => {
      setSession(data?.session),
        queryClient.invalidateQueries(["totalLikes", "IsLiked"]);
    },
  });
  const handleLike = (e) => {
    e.preventDefault();
    likeRecipeMutation.mutate();
  };
  const handleUnlike = (e) => {
    e.preventDefault();
    unlikeRecipeMutation.mutate();
  };

  if (isLiked.isError) {
    return <button onClick={handleLike}>🖤 {totalLikes.data?.likes}</button>;
  } else if (!isLiked.isError) {
    return <button onClick={handleUnlike}>❤️ {totalLikes.data?.likes}</button>;
  }
  if (!token) return <button>🖤 {totalLikes.data?.likes}</button>;
}

Likes.propTypes = {
  recipeId: PropTypes.string.isRequired,
};
