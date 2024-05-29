import { useLocation } from "react-router-dom";
import { Prescription } from "../../../types";
import Header from "../../Header";
import { PrescriptionCard } from "../../prescriptions/PrescriptionCard";
import { Container } from "../../home/Container";

export const PrescriptionStatusList = (): JSX.Element => {
  const location = useLocation();
  const { prescriptions, patient }: any = location.state || { prescriptions: [], patient: {} };
  const status = location.pathname.split('/').pop();

  let statusText: string = '';

  switch (status) {
    case 'valid':
      statusText = 'valides';
      break;
    case 'invalid':
      statusText = 'invalides';
      break;
    case 'expireSoon':
      statusText = 'expirent bientôt';
      break;
  }

  return (
    <Container>
      <Header />
      {prescriptions.length > 0 ?
        (
          <>
            {prescriptions.map((prescription: Prescription) => (
              <PrescriptionCard
                key={prescription.id}
                doctorName={prescription.prescribing_doctor}
                endDate={prescription.end_date}
                patientName={patient.firstname + ' ' + patient.lastname}
                prescription={prescription}
              />
            ))}
          </>
        ) : (
            <p className="m-8">Il n'y a pas d'ordonnance {statusText}</p>
        )
      }
    </Container>
  )
}
