import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import PropTypes from "prop-types";
import { User } from "./User.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeRecipe } from "../api/recipes.js";

export function Likes({ likes, recipeId }) {
  const [token] = useAuth();
  const queryClient = useQueryClient();
  const likeRecipeMutation = useMutation({
    mutationFn: () => likeRecipe(token, recipeId),
    onSuccess: () => queryClient.invalidateQueries(["recipes"]),
  });
  const handleLike = (e) => {
    e.preventDefault();
    likeRecipeMutation.mutate();
  };
  if (token) {
    const { sub } = jwtDecode(token);

    if (likes.includes(sub)) {
      return (
        <div>
          <div>
            <User id={sub} />
          </div>
          <button>Unlike</button> {likes.length}
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <User id={sub} />
          </div>
          <button onClick={handleLike}>Like</button> {likes.length}
        </div>
      );
    }
  }
  return (
    <div>
      <div>Likes: {likes.length}</div>
    </div>
  );
}

Likes.propTypes = {
  likes: PropTypes.array,
  recipeId: PropTypes.string,
};
