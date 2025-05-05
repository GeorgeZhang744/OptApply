interface ILoadingProps {
  isOpen: boolean;
}

const Loading: React.FC<ILoadingProps> = ({ isOpen }) => {
  return (
    <dialog id="loading-modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 sm:w-80 md:w-96 flex flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    </dialog>
  );
};

export default Loading;
