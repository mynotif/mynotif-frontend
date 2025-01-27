import { LogOutIcon, XIcon } from 'lucide-react'

interface LogoutModalProps {
    show: boolean
    onConfirm: () => void
    onCancel: () => void
}

const LogoutModal: React.FC<LogoutModalProps> = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-colorsecondary via-colorsecondary to-shade3 backdrop-blur-sm border border-gray-400 rounded-lg p-6 space-y-6 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div className="bg-colorprimary/10 rounded-full w-12 h-12 flex items-center justify-center">
                        <LogOutIcon className="text-colorprimary w-6 h-6" />
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="text-center space-y-4 flex-grow flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Voulez-vous vous déconnecter ?
                    </h2>
                    <p className="text-sm text-gray-500">
                        Vous devrez vous reconnecter pour accéder à votre compte.
                    </p>
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-colorsecondary text-colorprimary py-2 rounded-lg hover:bg-shade3 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-colorprimary text-white py-2 rounded-lg hover:bg-shade1 transition-colors"
                    >
                        Se déconnecter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal
