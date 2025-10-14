import { useAuth } from "../contexts/AuthContext.jsx";
import PropTypes from "prop-types";

export function Likes({ likes }) {
  const [token] = useAuth();
  if (token) {
    return (
      <div>
        <button>Likes</button> {likes.length}
      </div>
    );
  } else {
    return <div>Likes: {likes.length}</div>;
  }
}

Likes.propTypes = {
  likes: PropTypes.array,
};
