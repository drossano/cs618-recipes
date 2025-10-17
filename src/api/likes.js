export const likeRecipe = (token, like) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(like),
  }).then((res) => res.json());
