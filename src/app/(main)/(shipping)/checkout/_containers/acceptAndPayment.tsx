import PaymentGateways from "../_components/paymentGateways";
import TermsConditions from "../_components/termsConditions";

const AcceptAndPayment = () => {
  return (
    <section>
      <div className="border border-primary-500 rounded-4xl px-22 py-6 flex flex-col gap-10">
        <PaymentGateways />
        <TermsConditions />
      </div>
    </section>
  );
};

export default AcceptAndPayment;
