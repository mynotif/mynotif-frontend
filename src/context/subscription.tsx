import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { TokenContext } from './token';
import { ProfileContext } from './profile';
import { getSubscriptionById } from '../services/api';

interface SubscriptionData {
  active: boolean;
  hosted_invoice_url: string;
}

const defaultSubscriptionData: SubscriptionData = {
  active: false,
  hosted_invoice_url: '',
}

const SubscriptionContext = createContext<SubscriptionData>(defaultSubscriptionData);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<SubscriptionData>(defaultSubscriptionData);
  const { token } = useContext(TokenContext);
  const { profile } = useContext(ProfileContext);

  const fetchSubscription = useCallback(async () => {
    if (token && profile) {
      const subscription = await getSubscriptionById(token, profile.id);
      setSubscription({
        active: subscription.active,
        hosted_invoice_url: subscription.hosted_invoice_url,
      });
    }
  }
  , [token, profile]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return (
    <SubscriptionContext.Provider value={subscription}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionData => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
