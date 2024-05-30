import Modal from "react-modal";
// import { Image as ImageModelProps } from "../App/App.types";
const customStyles: ReactModal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(60, 60, 60, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
  },
};

Modal.setAppElement("#root");

interface Props {
  open: boolean;
  closeModal: () => void;
  selectedImage: {
    urls: {
      regular: string;
    };
    alt_description: string;
  } | null;
}

const ImageModal: React.FC<Props> = ({ open, closeModal, selectedImage }) => {
  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image modal window"
      >
        {selectedImage !== null && selectedImage !== undefined && (
          <div>
            <img
              onClick={closeModal}
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description}
            />
          </div>
        )}
      </Modal>
    </>
  );
};
export default ImageModal;