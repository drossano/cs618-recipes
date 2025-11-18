import PropTypes from "prop-types";
import { Recipe } from "./Recipe.jsx";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/users.js";
const NOTIF_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};
export function Notification({ open, onClose, recipe }) {
  if (!open) {
    return null;
  }
  const userinfoQuery = useQuery({
    queryKey: ["users", recipe?.author],
    queryFn: () => getUserInfo(recipe?.author),
    enabled: Boolean(recipe?.author),
  });
  const userInfo = userinfoQuery.data ?? {};

  return (
    <>
      <div style={OVERLAY_STYLES}>
        <div style={NOTIF_STYLES}>
          <button onClick={onClose}>Close Notificaiton</button>
          <br />
          New Recipe!
          <Fragment>
            <Recipe
              name={recipe.name}
              id={recipe._id}
              likes={recipe.likes}
              author={userInfo}
            />
          </Fragment>
        </div>
      </div>
    </>
  );
}

Notification.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  recipe: PropTypes.shape(Recipe.propTypes),
};
