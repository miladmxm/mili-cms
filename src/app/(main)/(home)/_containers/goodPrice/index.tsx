import H3 from "@/components/ui/h2";

const GoodPriceProducts = () => {
  return (
    <section className="container @container mt-26">
      <svg
        className="sr-only"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1 1"
      >
        <defs>
          <clipPath id="divGvEvgS-desktop" clipPathUnits="objectBoundingBox">
            <path d=" M0 0.2532C0 0.1108 0.0647 0 0.1384 0.0138C0.2439 0.0335 0.3894 0.0562 0.5 0.0562C0.6106 0.0562 0.7561 0.0335 0.8616 0.0138C0.9353 0 1 0.1108 1 0.2532V0.7625C1 0.8937 0.9448 1 0.8766 1H0.5H0.1234C0.0552 1 0 0.8937 0 0.7625V0.2532Z" />
          </clipPath>
        </defs>
      </svg>

      <svg
        className="sr-only"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1 1"
      >
        <defs>
          <clipPath id="divGvEvgS-mobile" clipPathUnits="objectBoundingBox">
            <path d=" M0 0.0886C0 0.0388 0.0562 0 0.1202 0.005C0.2266 0.0132 0.3828 0.0235 0.5 0.0235C0.6172 0.0235 0.7734 0.0132 0.8798 0.005C0.9438 0 1 0.0388 1 0.0886V0.9169C1 0.9628 0.952 1 0.8929 1H0.5H0.1071C0.048 1 0 0.9628 0 0.9169V0.0886Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="my-12 py-20 bg-primary-500 h-screen clip-path-url-[#divGvEvgS-mobile] xl:clip-path-url-[#divGvEvgS-desktop]">
        <H3 className="mt-10">کالاهای قیمت مناسب</H3>
      </div>
    </section>
  );
};

export default GoodPriceProducts;
