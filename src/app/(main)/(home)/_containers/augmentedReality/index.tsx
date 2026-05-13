import ARcontent from "./arContent";
import ARbackground from "./background";
import ARproduct from "./product";

const AugmentedReality = () => {
  return (
    <section className="md:my-32 my-8">
      <div className="container md:hidden">
        <ARcontent />
      </div>
      <ARbackground>
        <div className="grid md:grid-cols-2 container h-full">
          <ARcontent className="max-md:hidden" />
          <div className="items-end flex justify-end pb-6 md:pb-22">
            <ARproduct />
          </div>
        </div>
      </ARbackground>
    </section>
  );
};

export default AugmentedReality;
