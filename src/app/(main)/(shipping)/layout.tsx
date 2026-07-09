import NavigationProgress from "./containers/navigationProgress";

const ShippingLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <NavigationProgress />
      {children}
    </>
  );
};

export default ShippingLayout;
