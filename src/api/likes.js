export const likeRecipe = (token, like) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(like),
  }).then((res) => res.json());

export const getTotalLikes = (recipeId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/likes/totalLikes/${recipeId}`,
  ).then((res) => res.json());
