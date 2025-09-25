import PropTypes from "prop-types";
import { User } from "./User.jsx";
import TextWithLineBreaks from "./TextWithLineBreaks.jsx";

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
        <TextWithLineBreaks text={ingredients} />
      </div>
      <div>
        <h4>Steps</h4>
        <TextWithLineBreaks text={steps} />
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
