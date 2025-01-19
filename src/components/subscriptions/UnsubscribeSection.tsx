import React, { useState } from 'react';
import UnsubscribeConfirmation from './UnsubscribeConfirmation';
import { deleteSubscription } from "../../services/api";
import { TokenContext } from "../../context/token";
import { strict as assert } from 'assert'
import { useContext } from "react";
import { useSubscription } from '../../hook/subscription';

const UnsubscribeSection = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { fetchSubscription } = useSubscription();
  const { token } = useContext(TokenContext)

  const handleDeleteSubscription = async () => {
    assert(token)
    await deleteSubscription(token)
  }

  const handleFetchSubscription = async () => await fetchSubscription()

  return (
    <div className="border-t pt-4">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Se désabonner
        </button>
      ) : (
        <UnsubscribeConfirmation
          deleteSubscription={handleDeleteSubscription}
          fetchSubscription={handleFetchSubscription}
          setShowConfirm={setShowConfirm}
        />
      )}
    </div>
  );
};

export default UnsubscribeSection;
