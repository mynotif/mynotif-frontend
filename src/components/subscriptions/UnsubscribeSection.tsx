import React, { useState } from 'react';
import UnsubscribeConfirmation from './UnsubscribeConfirmation';
import { deleteSubscription } from "../../services/api";
import { TokenContext } from "../../context/token";
import { strict as assert } from 'assert'
import { useContext } from "react";
import { useSubscription } from '../../hook/subscription';
import { Button } from '../forms/inputGroups/Button';

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
    <div className="border-t border-gray-200 pt-4">
      {!showConfirm ? (
        <Button
          variant="secondary"
          onClick={() => setShowConfirm(true)}
          className="w-full bg-red-500 text-white hover:bg-red-600"
        >
          Se désabonner
        </Button>
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
