import { useContext, useState } from "react";
import { Button } from "../../components/forms/inputGroups/Button";
import {PlanSelection} from "../../components/subscriptions/PlanSelection";
import { createSubscription } from "../../services/api";
import { TokenContext } from "../../context/token";
import { strict as assert } from 'assert'
import type { SubscriptionPlanType } from "../../types";
import ManageSubscription from "../../components/subscriptions/ManageSubscription";
import {LegalLinks} from "../../components/subscriptions/LegalLinks";
import {PlanSelectionHeader} from "../../components/subscriptions/PlanSelectionHeader";
import { useSubscription } from "../../hook/subscription";
import { Container } from "../../components/home/Container";

export const Subscription = () => {
  const { subscription } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType | null>(null);
  const { token } = useContext(TokenContext)
  const isActive = subscription.active

  const redirectToCheckout = (checkoutUrl?: string) => {
    if (!checkoutUrl) {
      console.error('Checkout URL not found.');
      return;
    }
    window.location.href = checkoutUrl;
  };

  const handleSubscription = async () => {
    if (!selectedPlan) return;
    assert(token)
    const { checkout_url } = await createSubscription(token, selectedPlan)
    redirectToCheckout(checkout_url)
  }

  return (
    <Container>
      {!isActive ? (
        <div className="space-y-8 max-w-md mx-auto">
          <PlanSelectionHeader />
          <PlanSelection
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
          <Button
            variant="accent"
            disabled={!selectedPlan}
            onClick={handleSubscription}
            className="w-full"
          >
            Souscrire
          </Button>
          <LegalLinks />
        </div>
      ) : (
        <ManageSubscription />
      )}
    </Container>
  );
};

