import { Header } from "@/components/Header";
import { MedicineBookingForm } from "@/components/MedicineBookingForm";
import { MedicalQueryForm } from "@/components/MedicalQueryForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-2 pb-8 sm:px-6 sm:pt-4 sm:pb-12">
      <Header />

      <Tabs defaultValue="booking" className="mt-2 sm:mt-2">
        <TabsList>
          <TabsTrigger value="booking">Medicine Booking</TabsTrigger>
          <TabsTrigger value="query">Medical Query</TabsTrigger>
        </TabsList>

        <TabsContent value="booking">
          <MedicineBookingForm />
        </TabsContent>

        <TabsContent value="query">
          <MedicalQueryForm />
        </TabsContent>
      </Tabs>

      <footer className="mt-10 text-center text-xs text-slate-500">
        <p>Trusted care at RMT Medical Store</p>
        <p className="mt-1">Fast delivery · Genuine medicines</p>
      </footer>
    </div>
  );
}
