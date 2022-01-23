import React, { useContext } from "react";
import { MeasurementProvider } from "./src/context/MeasurementContext";
import { SenzorProvider } from "./src/context/SenzorContext";
import Home from "./src/screens/Home";
export default function App() {
  return (
    <SenzorProvider>
      <MeasurementProvider>
        <Home />
      </MeasurementProvider>
    </SenzorProvider>
  );
}
