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
    <div className="min-h-screen bg-gray-50 pt-32 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ProductStatusCard
            product_name={product_name}
            active={active}
          />

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <StartPaymentSubscribe
                current_period_start={current_period_start}
              />

              <NextPaymentSubscribe
                current_period_end={current_period_end}
                cancel_at_period_end={cancel_at_period_end}
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <Button
                variant="accent"
                size="small"
                icon={["fas", "arrow-left"]}
                onClick={() => { window.open(invoice_pdf); }}
              >
                Télécharger la facture
              </Button>
            </div>

            {!cancel_at_period_end && (
              <UnsubscribeSection />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;
