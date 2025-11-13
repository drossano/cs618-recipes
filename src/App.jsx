import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import PropTypes from "prop-types";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider } from "@apollo/client/react/index.js";
import { ApolloClient, InMemoryCache } from "@apollo/client/core/index.js";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_HOST);

socket.on("connect", () => {
  console.log("connected to socket.io as", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("socket.io connect error:", err);
});

const queryClient = new QueryClient();
const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export function App({ children }) {
  return (
    <HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </HelmetProvider>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};
