import InvoiceTotalSidebar from "./_components/invoiceTotalSidebar";
import NavigationProgress from "./_components/navigationProgress";

const ShippingLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <NavigationProgress />

      <main className="container py-6">
        <div className="grid max-w-full lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-4">
          {children}
          <InvoiceTotalSidebar />
        </div>
      </main>
    </>
  );
};

export default ShippingLayout;
