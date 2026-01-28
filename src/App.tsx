import { CandidatesScreen } from "./screens/Candidates/CandidatesScreen";

export function App() {
  console.log("📱 App rendering - Candidates Screen");

  return (
    <CandidatesScreen
      requestTitle="Graphic Designer for Social Media Optimisation"
      onGoBack={() => console.log("Go back clicked")}
    />
  );
}

