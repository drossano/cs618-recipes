import PropTypes from "prop-types";
import { User } from "./User.jsx";
import { TextToList } from "./TextToList.jsx";
import { Link } from "react-router-dom";
import { Likes } from "./Likes.jsx";
import slug from "slug";

export function Recipe({
  name,
  ingredients,
  steps,
  author,
  image,
  id,
  fullRecipe = false,
}) {
  return (
    <article>
      {fullRecipe ? (
        <div>
          <h3>{name}</h3>
        </div>
      ) : (
        <div>
          <Link to={`/recipes/${id}/${slug(name)}`}>
            <h3>{name}</h3>
          </Link>
          <div>
            <Likes recipeId={id} />
          </div>
          <img src={image} alt="" />
        </div>
      )}
      {fullRecipe && (
        <div>
          <Likes recipeId={id} />
          <div>
            <img src={image} alt="" />
          </div>
          <div>
            <h4>Ingredients</h4>
            <TextToList text={ingredients} ordered={false} />
          </div>
          <div>
            <h4>Steps</h4>
            <TextToList text={steps} ordered={true} />
          </div>
        </div>
      )}

      {author && (
        <em>
          {fullRecipe && <br />}
          Written by <User {...author} />
        </em>
      )}
    </article>
  );
}

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  steps: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
  fullRecipe: PropTypes.bool,
};
