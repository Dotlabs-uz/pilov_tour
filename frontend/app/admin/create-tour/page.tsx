// app/admin/create-tour/page.tsx
import { CreateTourForm } from "@/components/custom/CreateTourForm";

export default function CreateTourPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto px-4">
        <CreateTourForm />
      </div>
    </div>
  );
}
