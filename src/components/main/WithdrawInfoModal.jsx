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

export default function WithdrawInfoModal({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <p className="mb-0 text-center">
        The Landshare BUSD Vault contributes to the LAND-BNB LP pool and rewards
        stakers in both LAND and BUSD. In order to deposit, withdraw, or
        harvest, you must hold 1 LAND token for every 5 BUSD deposited.
      </p>
    </Modal>
  );
}
