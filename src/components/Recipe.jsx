import PropTypes from "prop-types";
import { User } from "./User.jsx";
import TextToList from "./TextToList.jsx";

export function Recipe({ name, ingredients, steps, author, image }) {
  return (
    <article>
      <h3>{name}</h3>
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
      <div>
        <img src={image} alt="" />
      </div>
      <div>
        <h4>Ingredients</h4>
        <TextToList text={ingredients} listType="ul" />
      </div>
      <div>
        <h4>Steps</h4>
        <TextToList text={steps} listType="ol" />
      </div>
    </article>
  );
}

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  steps: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
};
