import { FilePlusIcon, UserPlusIcon } from "lucide-react";

interface WelcomeSectionProps {
    goToNewAddPatient: () => void;
    goToNewPrescription: () => void;
}

export const WelcomeSection = ({ goToNewAddPatient, goToNewPrescription }: WelcomeSectionProps): JSX.Element => (
    <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6 text-center">
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
                Bienvenue sur OrdoPro
            </h2>
            <p className="text-gray-600">
                Commencez par ajouter votre premier patient ou créer votre première ordonnance.
            </p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={goToNewAddPatient}
                    className="flex items-center space-x-2 bg-colorprimary text-sm text-white px-4 py-2 rounded-lg hover:bg-shade1 transition-colors"
                >
                    <UserPlusIcon className="w-5 h-5" />
                    <span>Créer un patient</span>
                </button>
                <button
                    onClick={goToNewPrescription}
                    className="flex items-center space-x-2 bg-white text-sm text-colorprimary px-4 py-2 rounded-lg hover:bg-shade3 transition-colors"
                >
                    <FilePlusIcon className="w-5 h-5" />
                    <span>Créer une ordonnance</span>
                </button>
            </div>
        </div>
    </div>
);
