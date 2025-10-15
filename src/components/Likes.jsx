import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import PropTypes from "prop-types";
import { User } from "./User.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeRecipe, unlikeRecipe } from "../api/recipes.js";
import { useState } from "react";

export function Likes({ likes, recipeId }) {
  const [token] = useAuth();

  const [numLikes, setLikes] = useState(likes.length);
  if (token) {
    const { sub } = jwtDecode(token);
    const [liked, setLiked] = useState(likes.includes(sub));
    if (liked) {
      const queryClient = useQueryClient();
      const unlikeRecipeMutation = useMutation({
        mutationFn: () => unlikeRecipe(token, recipeId),
        onSuccess: () => queryClient.invalidateQueries(["recipe"]),
      });
      const handleUnlike = (e) => {
        e.preventDefault();
        setLiked(false);
        setLikes(numLikes - 1);
        unlikeRecipeMutation.mutate();
      };

      return (
        <div>
          <div>
            <User id={sub} />
          </div>
          <button onClick={handleUnlike}>Unlike</button> {numLikes}
        </div>
      );
    } else {
      const queryClient = useQueryClient();
      const likeRecipeMutation = useMutation({
        mutationFn: () => likeRecipe(token, recipeId),
        onSuccess: () => queryClient.invalidateQueries(["recipe"]),
      });
      const handleLike = (e) => {
        e.preventDefault();
        setLiked(true);
        setLikes(numLikes + 1);
        likeRecipeMutation.mutate();
      };
      return (
        <div>
          <div>
            <User id={sub} />
          </div>
          <button onClick={handleLike}>Like</button> {numLikes}
        </div>
      );
    }
  }
  return (
    <div>
      <div>Likes: {numLikes}</div>
    </div>
  );
}

Likes.propTypes = {
  likes: PropTypes.array,
  recipeId: PropTypes.string,
};
