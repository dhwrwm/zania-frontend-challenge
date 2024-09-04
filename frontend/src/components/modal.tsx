type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  return (
    <>
      <div className="absolute inset-0 py-10 z-[99999] overflow-scroll">
        <div
          onClick={onClose}
          className="bg-white rounded-full py-2 px-4 fixed top-4 right-4 cursor-pointer text-[19px]"
        >
          x
        </div>
        {children}
      </div>
      <div className="bg-backdrop fixed inset-0" />
    </>
  );
};

export default Modal;
