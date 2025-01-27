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
import { Container } from '../../components/home/Container';
import { InfoRow } from '../../components/pageSections/detail/InfoRow';

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
        <Container>
            <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Informations du Patient
                    </h3>
                    <div className="space-y-2">
                        <InfoRow
                            label="Nom et Prénom"
                            value={`${patient.lastname} ${patient.firstname}`}
                        />
                        {(!patient.lastname || !patient.firstname) && (
                            <p className="text-red-500 text-sm">
                                Le nom ou le prénom du patient est manquant.
                            </p>
                        )}
                        <InfoRow
                            label="Date de naissance"
                            value={patient.birthday}
                        />
                        {!patient.birthday && (
                            <p className="text-red-500 text-sm">
                                La date de naissance du patient est manquante.
                            </p>
                        )}
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Informations du Médecin
                    </h3>
                    <div className="space-y-2">
                        <InfoRow
                            label="Médecin/Cabinet"
                            value={prescription.prescribing_doctor}
                        />
                        {!prescription.prescribing_doctor && (
                            <p className="text-red-500 text-sm">
                                Le nom du médecin ou du cabinet est manquant.
                            </p>
                        )}
                        <InfoRow
                            label="Email"
                            value={prescription.email_doctor}
                        />
                        {!prescription.email_doctor && (
                            <p className="text-red-500 text-sm">
                                L'e-mail du docteur n'a pas été renseigné.
                            </p>
                        )}
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Détails des Soins
                    </h3>
                    <textarea
                        placeholder="Passage IDE à domicile, 3x/jr pour glycémie + insuline du 1er février pour 6 mois"
                        value={careDetails}
                        onChange={(e) => setCareDetails(e.target.value)}
                        className="w-full bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-3 h-32 focus:ring-2 focus:ring-colorprimary transition-all"
                    />
                    {!careDetails.trim() && (
                        <p className="text-red-500 text-sm mt-2">
                            Les détails des soins sont manquants.
                        </p>
                    )}
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Signature
                    </h3>
                    <p className="text-gray-600">
                        Cordialement,
                    </p>
                    <p className={`${!profile.last_name || !profile.first_name ? 'text-red-500' : 'text-gray-800'}`}>
                        Infirmière {profile.last_name} {profile.first_name}
                    </p>
                    {(!profile.last_name || !profile.first_name) && (
                        <p className="text-red-500 text-sm mt-2">
                            Le nom de l'infirmière est manquant.
                        </p>
                    )}
                </div>

                <Button
                    onClick={handleSendEmail}
                    variant={isPresentData && (!sending || errors.length === 0) ? 'accent' : 'disabled'}
                    isLoading={sending}
                >
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
        </Container>
    );
};

export default ReviewSendDoctor;
