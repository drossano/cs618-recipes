import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import PropTypes from "prop-types";
import { User } from "./User.jsx";

export function Likes({ likes }) {
  const [token] = useAuth();
  const { sub } = jwtDecode(token);
  if (token) {
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
          <button>Like</button> {likes.length}
        </div>
      );
    }
  }
  return (
    <div>
      <div>{sub}</div>
      <div>Likes: {likes.length}</div>
    </div>
  );
}

Likes.propTypes = {
  likes: PropTypes.array,
};
