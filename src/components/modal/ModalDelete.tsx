import { FunctionComponent } from 'react'

interface ModalDeleteProps {
  handleClose: () => void
  show: boolean
  onDelete: (e: React.MouseEvent<HTMLElement>) => void
  confirmText: string
  noSuccessText: string
  successText: string
}

const ModalDelete: FunctionComponent<ModalDeleteProps> = ({ handleClose, show, onDelete, confirmText, noSuccessText, successText }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="px-6 py-4 border-b border-gray-200">
              <h5 className="text-lg font-bold">Confirmation</h5>
            </div>
            <div className="px-6 py-4">
              <p>{confirmText}</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={handleClose}
              >
                {noSuccessText}
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={onDelete}
              >
                {successText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalDelete
