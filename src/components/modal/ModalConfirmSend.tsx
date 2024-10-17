interface ModalConfirmSendProps {
    handleClose: () => void;
    show: boolean;
    onConfirm: () => void;
    confirmText: string;
    noText: string;
    yesText: string;
  }

const ModalConfirmSend = ({ handleClose, show, onConfirm, confirmText, noText, yesText }: ModalConfirmSendProps) => {
    return (
      <>
        {show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
              <div className="px-6 py-4 border-b border-gray-200">
                <h5 className="text-lg font-bold">Confirmation d'envoi</h5>
              </div>
              <div className="px-6 py-4">
                <p>{confirmText}</p>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={handleClose}
                >
                  {noText}
                </button>
                <button
                  className="px-4 py-2 bg-colorprimary  hover:bg-shade2 text-white rounded"
                  onClick={onConfirm}
                >
                  {yesText}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

export default ModalConfirmSend;
