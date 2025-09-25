import React from "react";
import PropTypes from "prop-types";

export default function TextToList(props) {
  const textWithBreaks = props.text.split("\n").map((text, index) => (
    <React.Fragment key={index}>
      <li>{text}</li>
    </React.Fragment>
  ));
  if (props.listType == "ul") {
    return <ul>{textWithBreaks}</ul>;
  } else if (props.listType == "ol") {
    return <ol>{textWithBreaks}</ol>;
  }
}
TextToList.propTypes = {
  text: PropTypes.string.isRequired,
  listType: PropTypes.string.isRequired,
};
