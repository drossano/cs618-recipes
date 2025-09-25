import React from "react";
import PropTypes from "prop-types";

function TextWithLineBreaks(props) {
  const textWithBreaks = props.text.split("\n").map((text, index) => (
    <React.Fragment key={index}>
      {text}
      <br />
    </React.Fragment>
  ));
  return <div>{textWithBreaks}</div>;
}

export default TextWithLineBreaks;

TextWithLineBreaks.propTypes = {
  text: PropTypes.string.isRequired,
};
