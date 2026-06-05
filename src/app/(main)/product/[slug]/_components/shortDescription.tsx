const ShortDescription = ({ description }: { description: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="font-bold text-gray-500">توضیحات:</h5>
      <p className="max-md:text-sm text-gray-500/50 text-justify">
        {description}
      </p>
    </div>
  );
};

export default ShortDescription;
