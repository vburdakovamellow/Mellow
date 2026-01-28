import { SharePackScreen } from "./screens/SharePack/SharePackScreen";

export function App() {
  console.log("📱 App rendering - Share Screen");

  const mockRequest = {
    id: "req-123",
    title: "Graphic Designer for Social Media Optimisation",
    companyName: "Furniture Manufacturing Co.",
    location: "Remote",
    skills: ["Graphic Design", "Social Media", "Adobe Creative Suite"],
    languages: ["English"],
    timeline: {
      workload: "Full-time",
      startDate: "ASAP",
      flexible: false
    },
    budget: {
      paymentType: "hourly" as const,
      from: "25",
      to: "45",
      currency: "USD"
    }
  };

  return (
    <SharePackScreen
      request={mockRequest}
      onGoToEdit={() => console.log("Go to Edit")}
      onGoToView={() => console.log("Go to View")}
    />
  );
}

