import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MeasurementContext } from "./MeasurementContext";
const ENDPOINT = "http://server-for-esp32.herokuapp.com/";
import socketIOClient from "socket.io-client";
const socket = socketIOClient(ENDPOINT);
console.log(socket.connected, "socket");

interface SenzorValues {
  temperature: number;
  humidity: number;
  brightness: number;
}
type measurmentData = {
  temperature: number;
  humidity: number;
  brightness: number;
  date: string;
};
interface SenzorContextInterface {
  senzorValues: SenzorValues;
}

export const SenzorContext = React.createContext<SenzorContextInterface>({
  senzorValues: { temperature: 0, humidity: 0, brightness: 0 },
});
interface SenzorProviderProps {}

export const SenzorProvider: React.FC<SenzorProviderProps> = ({ children }) => {
  const [senzorValues, setSenzorVal] = useState<SenzorValues>({
    temperature: 0,
    humidity: 0,
    brightness: 0,
  });
  const conSocket = () => {
    console.log("socket on");
    socket.on("senzor_data", (res: SenzorValues) => {
      console.log(res);
      setSenzorVal(res);
    });
  };
  useEffect(() => {
    conSocket();
    return () => {
      console.log("cleanup 1");
      socket.close();
    };
  }, []);
  return (
    <SenzorContext.Provider
      value={{
        senzorValues,
      }}
    >
      {children}
    </SenzorContext.Provider>
  );
};
