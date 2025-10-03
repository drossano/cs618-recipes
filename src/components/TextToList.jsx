import React from "react";
import PropTypes from "prop-types";

export function TextToList(props) {
  const lis = props.text.split("\n").map((text, index) => (
    <React.Fragment key={index}>
      <li>{text}</li>
    </React.Fragment>
  ));
  if (props.ordered == true) {
    return <ol>{lis}</ol>;
  } else if (props.ordered == false) {
    return <ul>{lis}</ul>;
  }
}

TextToList.propTypes = {
  text: PropTypes.string.isRequired,
  ordered: PropTypes.bool.isRequired,
};
