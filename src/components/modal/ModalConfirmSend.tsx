import { XIcon } from "lucide-react";
import { Button } from "../forms/inputGroups/Button";

interface ModalConfirmSendProps {
  handleClose: () => void;
  show: boolean;
  onConfirm: () => void;
  confirmText: string;
  noText: string;
  yesText: string;
}

export const ModalConfirmSend = ({
  handleClose,
  show,
  onConfirm,
  confirmText,
  noText,
  yesText
}: ModalConfirmSendProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-colorsecondary via-colorsecondary to-shade3 backdrop-blur-sm border border-gray-400 rounded-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-400/30">
          <h2 className="text-xl font-semibold text-gray-800">Confirmation d'envoi</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-colorprimary transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-700">{confirmText}</p>
        </div>

        <div className="px-6 pb-6 flex justify-center space-x-4">
          <Button
            variant='secondary'
            size="small"
            className="flex-1"
            onClick={handleClose}
          >
            {noText}
          </Button>
          <Button
            variant='accent'
            size="small"
            className="flex-1"
            onClick={onConfirm}
          >
            {yesText}
          </Button>
        </div>
      </div>
    </div>
  );
};
