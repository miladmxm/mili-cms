import Radio from "@/components/ui/radio";
import { TERMS_CONDITIONS } from "@/constant/appData";

import { setIsRulesAccepted } from "../../_store";

const TermsConditions = () => {
  return (
    <div>
      <div className="bg-primary-50 border border-primary-500 p-4 rounded-4xl">
        <p className="text-justify">{TERMS_CONDITIONS}</p>
      </div>
      <div className="flex gap-4 mt-4 items-center">
        <Radio
          onChecked={() => setIsRulesAccepted(true)}
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
