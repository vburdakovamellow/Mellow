import { SharePackScreen } from "./screens/SharePack/SharePackScreen";

export function App() {
  console.log("📱 App rendering - Share Pack Screen");

  const mockRequest = {
    id: "1",
    title: "Graphic Designer for Social Media Optimisation",
    companyName: "Mellow",
    location: "Remote",
    skills: ["Graphic Design", "Social Media", "Branding"],
    languages: ["English", "Russian"],
    timeline: {
      workload: "Full-time",
      startDate: "2026-02-01",
      flexible: true
    },
    budget: {
      paymentType: "hourly" as const,
      from: "30",
      to: "50",
      currency: "USD"
    }
  };

  return (
    <SharePackScreen
      request={mockRequest}
      onGoToEdit={() => console.log("Go to edit")}
      onGoToView={() => console.log("Go to view")}
    />
  );
}

