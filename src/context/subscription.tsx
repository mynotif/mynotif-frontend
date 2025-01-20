import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import axios from 'axios'
import { TokenContext } from './token';
import { ProfileContext } from './profile';
import { getSubscriptionById } from '../services/api';
import { SubscriptionContextType, SubscriptionData } from '../types';

const defaultSubscriptionData: SubscriptionData = {
  active: false,
  invoice_pdf: '',
  current_period_end: '',
  current_period_start: '',
  product_name: '',
  cancel_at_period_end: false
}

export const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: defaultSubscriptionData,
  fetchSubscription: async () => {}
});

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<SubscriptionData>(defaultSubscriptionData);
  const { token } = useContext(TokenContext);
  const { profile } = useContext(ProfileContext);

  const fetchSubscription = useCallback(async () => {
    if (token && profile) {
      try {
        // Attempt to fetch the subscription, handling the case where no subscription exists
        // This could mean the user hasn't purchased a subscription or the subscription was cancelled
        const subscription = await getSubscriptionById(token, profile.id);
        setSubscription({
          active: subscription.active,
          invoice_pdf: subscription.invoice_pdf,
          current_period_end: subscription.current_period_end,
          current_period_start: subscription.current_period_start,
          product_name: subscription.product_name,
          cancel_at_period_end: subscription.cancel_at_period_end
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setSubscription(defaultSubscriptionData);
          return;
        }
        throw error;
      }
    }
  }, [token, profile]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return (
    <SubscriptionContext.Provider value={{ subscription, fetchSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
