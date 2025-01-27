import { Button } from "../forms/inputGroups/Button";
import NextPaymentSubscribe from './NextPaymentSubscribe';
import UnsubscribeSection from './UnsubscribeSection';
import StartPaymentSubscribe from "./StartPaymentSubscribe";
import ProductStatusCard from "./ProductStatusCard";
import { useSubscription } from "../../hook/subscription";

const ManageSubscription = () => {
  const { subscription } = useSubscription();

  const {
    active,
    invoice_pdf,
    current_period_end,
    current_period_start,
    product_name,
    cancel_at_period_end
  } = subscription;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <ProductStatusCard
        product_name={product_name}
        active={active}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <StartPaymentSubscribe
          current_period_start={current_period_start}
        />

        <NextPaymentSubscribe
          current_period_end={current_period_end}
          cancel_at_period_end={cancel_at_period_end}
        />
      </div>

      <div className="space-y-4">
        <Button
          variant="accent"
          onClick={() => { window.open(invoice_pdf); }}
          className="w-full"
        >
          Télécharger la facture
        </Button>

        {!cancel_at_period_end && (
          <UnsubscribeSection />
        )}
      </div>
    </div>
  );
};

export default ManageSubscription;
