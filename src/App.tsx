import { Toaster } from "sonner";
import { HomePage } from "@/pages/HomePage";

export default function App() {
  return (
    <>
      <main className="min-h-dvh">
        <HomePage />
      </main>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast:
              "rounded-xl border border-teal-brand/10 bg-white text-slate-800 shadow-lg",
            success: "text-teal-brand",
            error: "text-red-600",
          },
        }}
        richColors
        closeButton
      />
    </>
  );
}
