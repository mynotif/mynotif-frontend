import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../context/profile';
import { Button } from '../../components/forms/inputGroups/Button';
import 'react-datepicker/dist/react-datepicker.css';
import { Prescription, Patient } from '../../types';
import { sendEmailToDoctor } from '../../services/api';
import { TokenContext } from '../../context/token';
import assert from 'assert';
import ModalConfirmSend from '../../components/modal/ModalConfirmSend';

interface ReviewSendDoctorProps {
    patient: Patient;
    prescription: Prescription;
}

const ReviewSendDoctor = () => {
    const { profile } = useContext(ProfileContext);
    const location = useLocation();
    const { patient, prescription } = location.state as ReviewSendDoctorProps;
    const [sending, setSending] = useState(false);
    const [careDetails, setCareDetails] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    const { token } = useContext(TokenContext)
    const navigate = useNavigate()

    // Vérification des données requises
    const isPresentData = patient && patient.lastname && patient.firstname &&
                          patient.birthday &&
                          prescription && prescription.prescribing_doctor &&
                          prescription.end_date && prescription.email_doctor &&
                          profile && profile.last_name && profile.first_name;

    const checkForErrors = () => {
        const newErrors: string[] = [];

        if (!patient.lastname || !patient.firstname) {
            newErrors.push("Le nom ou le prénom du patient est manquant.");
        }
        if (!patient.birthday) {
            newErrors.push("La date de naissance du patient est manquante.");
        }
        if (!prescription.prescribing_doctor) {
            newErrors.push("Le nom du médecin ou du cabinet est manquant.");
        }
        if (!prescription.email_doctor) {
            newErrors.push("L'e-mail du docteur n'a pas été renseigné.");
        }
        if (!profile.last_name || !profile.first_name) {
            newErrors.push("Le nom de l'infirmière est manquant.");
        }
        if (!careDetails.trim()) {
            newErrors.push("Les détails des soins sont manquants.");
        }

        setErrors(newErrors);
    };

    const handleSendEmail = async () => {
        if (errors.length > 0) return
        setShowModal(true);
    };

    const confirmSendEmail = async () => {
        try {
            setSending(true);
            setShowModal(false);
            assert(token);
            await sendEmailToDoctor(token, prescription.id, careDetails);
            navigate('/prescriptions/' + prescription.id);
            setCareDetails('');
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
        } finally {
            setSending(false);
        }
    }

    useEffect(() => {
        checkForErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patient, prescription, profile, careDetails])

    return (
        <div className="m-12 pb-12 pt-10 flex flex-col justify-center items-start h-full text-lg space-y-3">
              {errors.length > 0 && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-sm text-red-700 rounded">
                    <h3 className="font-bold mb-2">Erreurs :</h3>
                    <ul className="list-disc pl-5">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Informations du Patient</h3>
                <p className="mb-2">
                    Nom et prénom : {patient.lastname} {patient.firstname}
                </p>
                <p className="mb-2">
                    Date de naissance : {patient.birthday}
                </p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Informations du Médecin ou Cabinet</h3>
                <p className="mb-2">
                   Médecin/Cabinet : {prescription.prescribing_doctor}
                </p>
                <p className="mb-2">
                    Email : {prescription.email_doctor}
                </p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Détails des Soins</h3>
                <textarea
                    placeholder="Passage ide à domicile, 3x/jr pour glycémie + insuline du 1er février pour 6mois"
                    value={careDetails}
                    onChange={(e) => setCareDetails(e.target.value)}
                    className="w-full p-2 mb-2 border rounded h-32"
                />
            </div>

            <p className="mb-4">Cordialement,</p>
            <p className={`mb-6  ${!profile.last_name || !profile.first_name ? 'text-red-500' : ''}`}>
                Infirmière {profile.last_name + ' ' + profile.first_name || 'Nom de l\'infirmière manquant'}
            </p>

            <Button onClick={handleSendEmail} size='medium' icon={['fas', 'envelope']} iconPosition='right' variant={isPresentData && (!sending || errors.length === 0) ? 'accent' : 'disabled'}>
                {sending ? 'Envoi en cours...' : 'Envoyer l\'e-mail'}
            </Button>

            <ModalConfirmSend
                show={showModal}
                handleClose={() => setShowModal(false)}
                onConfirm={confirmSendEmail}
                confirmText="Envoyer cet e-mail ?"
                noText="Annuler"
                yesText="Envoyer"
            />
        </div>
    );
};

export default ReviewSendDoctor;
