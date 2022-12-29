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

export default function LPInfoModal({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <p className="mb-0 text-center">
        Provide liquidity in the LAND-BNB Pool on Pancake Swap to receive LP Tokens. 
        Stake your LP tokens in the LAND-BNB LP Vault to earn additonal LAND rewards. 
        Daily distribution is 1,000 LAND and APR is calculated based on amount staked.
      </p>
    </Modal>
  );
}
