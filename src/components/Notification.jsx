import PropTypes from "prop-types";

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
export function Notification({ open, children, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <>
      <div style={OVERLAY_STYLES}>
        <div style={NOTIF_STYLES}>
          <button onClick={onClose}>Close Notificaiton</button>
          {children}
        </div>
      </div>
    </>
  );
}

Notification.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};
