interface UnsubscribeConfirmationProps {
  deleteSubscription: () => void;
  fetchSubscription: () => Promise<void>;
  setShowConfirm: (show: boolean) => void;
}

const UnsubscribeConfirmation = ({ deleteSubscription, fetchSubscription, setShowConfirm }: UnsubscribeConfirmationProps): JSX.Element => (
  <div className="space-y-3">
    <p className="text-sm text-gray-600 text-center">
      Êtes-vous sûr de vouloir vous désabonner ?
    </p>
    <div className="flex justify-center space-x-3">
      <button
        onClick={() => setShowConfirm(false)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Annuler
      </button>
      <button
        onClick={async () => {
          deleteSubscription();
          await fetchSubscription();
          setShowConfirm(false);
        }}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Confirmer
      </button>
    </div>
  </div>
);

export default UnsubscribeConfirmation;
