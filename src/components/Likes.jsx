import PropTypes from "prop-types";

export function Likes({ likes }) {
  return <div>Likes: {likes.length}</div>;
}

Likes.propTypes = {
  likes: PropTypes.array,
};
