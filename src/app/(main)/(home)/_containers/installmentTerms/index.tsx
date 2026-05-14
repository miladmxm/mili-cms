import InstallmentBackground from "./installmentBackground";
import InstallmentContent from "./installmentContent";
import InstallmentImage from "./installmentImage";

const InstallmentTerms = () => {
  return (
    <section className="container py-12">
      <InstallmentBackground>
        <div className="flex py-10 *:flex-1 items-stretch gap-6 md:flex-row flex-col-reverse">
          <InstallmentContent />
          <InstallmentImage />
        </div>
      </InstallmentBackground>
    </section>
  );
};

export default InstallmentTerms;
