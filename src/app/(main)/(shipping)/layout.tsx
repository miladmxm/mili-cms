import NavigationProgress from "./_containers/navigationProgress";

const ShippingLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <NavigationProgress />
      {children}
    </>
  );
};

export default ShippingLayout;
