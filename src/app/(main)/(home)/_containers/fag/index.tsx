import H3 from "@/components/ui/h2";

import FaqBackground from "./faqBackground";
import FaqList from "./faqList";

const FAQsection = () => {
  return (
    <section className="relative overflow-hidden py-16">
      <FaqBackground />
      <div className="container flex flex-col gap-12">
        <H3>سوالات متداول</H3>
        <FaqList />
      </div>
    </section>
  );
};

export default FAQsection;
