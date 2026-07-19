import Checkbox from "@/components/ui/checkbox";
import { TERMS_CONDITIONS } from "@/constant/appData";

import { useInitToPay } from "../hooks/useInitToPay";

const TermsConditions = () => {
  const { setRulesAccepted } = useInitToPay();
  return (
    <div>
      <div className="bg-primary-50 border border-primary-500 p-4 rounded-4xl">
        <p className="text-justify">{TERMS_CONDITIONS}</p>
      </div>
      <div className="flex gap-4 mt-4 items-center">
        <Checkbox
          onChecked={(isChecked) => {
            setRulesAccepted(isChecked);
          }}
          id="terms_conditions"
          name="terms_conditions"
        />
        <label htmlFor="terms_conditions" className="cursor-pointer">
          شرایط و قوانین وبسایت را می پذیرم
        </label>
      </div>
    </div>
  );
};

export default TermsConditions;
