import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CurrenAprModal({
  isOpen,
  closeModal,
  busd,
  landAPR,
  price,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="current-apr Modal"
    >
      <div className={`d-flex mt-2 mr-lg-2 mr-xl-3  flex-column`}>
        <p className="border-bottom-1 pb-2 d-flex mb-2 text-black w-100  justify-content-between">
          <span className="fw-500">BUSD Reward</span>
          <span>
            {/* &nbsp;:&nbsp; */}
            <span>{busd}%</span>
          </span>
        </p>
        <p className="border-bottom-1 pb-2 d-flex mb-2 text-black w-100   justify-content-between">
          <span className="fw-500">LAND Token @ ${price}</span>
          <span>
            {/* &nbsp;:&nbsp; */}
            <span>{landAPR}%</span>
          </span>
        </p>
        <p className="border-bottom-1 pb-2 d-flex mb-2 text-black w-100   justify-content-between">
          <span className="fw-500">Total APR</span>
          <span>
            {/* &nbsp;:&nbsp; */}
            <span>{busd + landAPR}%</span>
          </span>
        </p>
     
      </div>
    </Modal>
  );
}
