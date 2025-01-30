import { Button } from "../forms/inputGroups/Button";

interface UnsubscribeConfirmationProps {
  deleteSubscription: () => void;
  fetchSubscription: () => Promise<void>;
  setShowConfirm: (show: boolean) => void;
}

const UnsubscribeConfirmation = ({ 
  deleteSubscription, 
  fetchSubscription, 
  setShowConfirm 
}: UnsubscribeConfirmationProps): JSX.Element => (
  <div className="space-y-4">
    <p className="text-sm text-gray-600 text-center">
      Êtes-vous sûr de vouloir vous désabonner ?
    </p>
    <div className="flex space-x-4">
      <Button
        variant="secondary"
        onClick={() => setShowConfirm(false)}
        className="flex-1"
      >
        Annuler
      </Button>
      <Button
        variant="accent"
        onClick={async () => {
          deleteSubscription();
          await fetchSubscription();
          setShowConfirm(false);
        }}
        className="flex-1"
      >
        Confirmer
      </Button>
    </div>
  </div>
);

export default UnsubscribeConfirmation;
