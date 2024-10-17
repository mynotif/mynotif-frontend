import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileContext } from '../../context/profile';
import { Button } from '../../components/forms/inputGroups/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Prescription, Patient } from '../../types';
import { sendEmailToDoctor } from '../../services/api';
import { TokenContext } from '../../context/token';
import assert from 'assert';

interface ReviewSendDoctorProps {
    patient: Patient;
    prescription: Prescription;
}

const ReviewSendDoctor = () => {
    const { profile } = useContext(ProfileContext);
    const location = useLocation();
    const { patient, prescription } = location.state as ReviewSendDoctorProps;
    const [renewalDate, setRenewalDate] = useState<Date | null>(null);
    const [sending, setSending] = useState(false);

    const { token } = useContext(TokenContext)

    // Vérification des données requises
    const isPresentData = patient && patient.lastname && patient.firstname &&
                          patient.health_card_number &&
                          prescription && prescription.prescribing_doctor &&
                          prescription.end_date && prescription.email_doctor &&
                          profile && profile.last_name && profile.first_name &&
                          renewalDate;

    const handleSendEmail = async () => {
        if (isPresentData) {
            try {
                setSending(true);
                assert(token);
                await sendEmailToDoctor(token, prescription.id);
                console.log("Email envoyé !");
            } catch (error) {
                console.error("Erreur lors de l'envoi de l'email :", error);
            } finally {
                setSending(false);
            }
        } else {
            console.log("Données manquantes, impossible d'envoyer l'email.");
        }
    };

    return (
        <div className="m-12 pb-12 pt-10 flex flex-col justify-center items-start h-full text-lg space-y-3">
            <p className='font-bold mb-4 text-red-500'>Cet e-mail a été envoyé à partir d'une adresse e-mail dédiée au renouvellement et n'accepte pas de réponses.</p>
            <h2 className={`mb-2 ${!prescription.prescribing_doctor ? 'text-red-500' : ''}`}>
                Bonjour Dr. {prescription.prescribing_doctor || 'Nom du docteur manquant'},
            </h2>
            <p className={`mb-4 ${!patient.lastname || !patient.firstname ? 'text-red-500' : ''}`}>
                Je vous écris pour demander le renouvellement de l'ordonnance du patient {patient.lastname + ' ' + patient.firstname || 'Nom du patient manquant'}.
            </p>
            <ul className="mb-4 list-disc pl-5 space-y-2">
                <li className={`${!prescription.end_date ? 'text-red-500' : ''}`}>
                    Date de fin : {prescription.end_date || 'Date de fin manquante'}
                </li>
                <li className={`${!patient.lastname || !patient.firstname ? 'text-red-500' : ''}`}>
                    Patient : {patient.lastname + ' ' + patient.firstname || 'Nom du patient manquant'}
                </li>
                <li className={`${!patient.health_card_number ? 'text-red-500' : ''}`}>
                    Carte vitale : {patient.health_card_number || 'Numéro de carte vitale manquant'}
                </li>
            </ul>

            <p className="mb-4">
                Je souhaiterai un renouvellement jusqu'au {renewalDate ? renewalDate.toLocaleDateString() : <span className="text-red-500">Date non sélectionnée</span>}.
            </p>


            {/* DatePicker pour sélectionner la date de renouvellement */}
            <div className="mb-6">
                <label className="block mb-2 font-semibold">Sélectionnez la date de renouvellement :</label>
                <DatePicker
                    selected={renewalDate}
                    onChange={(date: Date | null) => setRenewalDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="border p-2 rounded-lg w-full"
                    placeholderText="Sélectionnez une date"
                    />
            </div>

            <p className="mb-4">Merci de bien vouloir procéder au renouvellement.</p>
            <p className="mb-4">Cordialement,</p>
            <p className={`mb-6  ${!profile.last_name || !profile.first_name ? 'text-red-500' : ''}`}>
                Infirmière {profile.last_name + ' ' + profile.first_name || 'Nom de l\'infirmière manquant'}
            </p>

            {/* Vérification de la présence de l'email du docteur */}
            {!prescription.email_doctor && (
                <p className="mb-4 text-red-500 font-semibold">
                    L'e-mail du docteur n'a pas été renseigné. Impossible d'envoyer l'e-mail.
                </p>
            )}
            <Button onClick={handleSendEmail} size='medium' icon={['fas', 'envelope']} iconPosition='right' variant={isPresentData && !sending ? 'accent' : 'disabled'}>
                {sending ? 'Envoi en cours...' : 'Envoyer l\'e-mail'}
            </Button>
        </div>
    );
};

export default ReviewSendDoctor;
