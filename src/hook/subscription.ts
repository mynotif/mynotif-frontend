import { useContext } from "react";
import { SubscriptionContextType } from "../types";
import { SubscriptionContext } from "../context/subscription";

export const useSubscription = (): SubscriptionContextType => {
    const context = useContext(SubscriptionContext);
    if (!context) {
      throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};
