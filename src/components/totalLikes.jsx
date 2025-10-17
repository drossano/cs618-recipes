import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { getTotalLikes } from "../api/likes.js";

export function TotalLikes({ recipeId }) {
  const totalLikes = useQuery({
    queryKey: ["totalLikes", recipeId],
    queryFn: () => getTotalLikes(recipeId),
  });
  if (totalLikes.isLoading) return <div>loading likes...</div>;
  return (
    <div>
      {totalLikes.data?.likes}{" "}
      {totalLikes.data?.likes === 1 ? " like" : " likes"}
    </div>
  );
}

TotalLikes.propTypes = {
  recipeId: PropTypes.string.isRequired,
};
