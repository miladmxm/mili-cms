import { SampleFAQ } from "./faq";
import FaqItem from "./faqItem";

const FaqList = () => {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-6xl">
      {SampleFAQ.map((faq) => (
        <FaqItem key={faq.q} {...faq} />
      ))}
    </div>
  );
};

export default FaqList;
