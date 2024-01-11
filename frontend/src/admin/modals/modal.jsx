/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const MODAL_STYLE = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  // backgroundColor: "rgb(216, 209, 209)",
  zIndex: 1000,
  padding: "50px 200px",
  borderRadius: "30px"
};
const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.5)",
  zIndex: 1000,
};
const Modal = (props) => {
  const { children, onClose, userId } = props;
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLE}>
        {/* <button
            onClick={onClose}
            className="absolute top-0 right-0  m-3 bg-gradient-to-b from-azure-300 to-azure-700 px-5  text-lg font-semibold text-slate-100 py-1 rounded-full shadow-slate-500 shadow-md hover:from-[#ff5b3e] hover:to-[#640d00f8] "
          >
            Close
          </button> */}
        {children}
      </div>
    </>
  );
};

export default Modal;
