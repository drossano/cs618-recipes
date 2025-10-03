import { useLoaderData } from "react-router-dom";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { Blog } from "./pages/Blog.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { ViewRecipe } from "./pages/ViewRecipe.jsx";
import { getRecipes, getRecipeById } from "./api/recipes.js";
import { getUserInfo } from "./api/users.js";

export const routes = [
  {
    path: "/",
    loader: async () => {
      const queryClient = new QueryClient();
      const author = "";
      const sortBy = "createdAt";
      const sortOrder = "descending";
      const posts = await getRecipes({ author, sortBy, sortOrder });
      await queryClient.prefetchQuery({
        queryKey: ["posts", { author, sortBy, sortOrder }],
        queryFn: () => posts,
      });
      const uniqueAuthors = posts
        .map((post) => post.author)
        .filter((value, index, array) => array.indexOf(value) === index);
      for (const userId of uniqueAuthors) {
        await queryClient.prefetchQuery({
          queryKey: ["users", userId],
          queryFn: () => getUserInfo(userId),
        });
      }
      return dehydrate(queryClient);
    },
    Component() {
      const dehydratedState = useLoaderData();
      return (
        <HydrationBoundary state={dehydratedState}>
          <Blog />
        </HydrationBoundary>
      );
    },
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/recipes/:recipeId/:slug?",
    loader: async ({ params }) => {
      const recipeId = params.recipeId;
      const queryClient = new QueryClient();
      const post = await getRecipeById(recipeId);
      await queryClient.prefetchQuery({
        queryKey: ["post", recipeId],
        queryFn: () => post,
      });
      if (post?.author) {
        await queryClient.prefetchQuery({
          queryKey: ["users", post.author],
          queryFn: () => getUserInfo(post.author),
        });
      }
      return { dehydratedState: dehydrate(queryClient), recipeId };
    },
    Component() {
      const { dehydratedState, recipeId } = useLoaderData();
      return (
        <HydrationBoundary state={dehydratedState}>
          <ViewRecipe recipeId={recipeId} />
        </HydrationBoundary>
      );
    },
  },
];
