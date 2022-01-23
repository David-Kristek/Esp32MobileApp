import React, { useEffect, useContext, useState } from "react";
// @ts-ignore
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://server-for-esp32.herokuapp.com";
const socket = socketIOClient(ENDPOINT);

interface MeasurementContextInterface {
  measurment: boolean;
  loaded: boolean;
  startMeasurment: () => void;
  stopMeasurment: () => void;
  saveMeasurment: (title: string) => void;
  loadMeasurment: (id: string) => void;
  measurmentData: measurmentData[];
  getMeasurements: () => any;
  stopLoadedMeasurement: () => any;
}

type measurmentData = {
  temperature: number;
  humidity: number;
  brightness: number;
  date: string;
};

export const MeasurementContext =
  React.createContext<MeasurementContextInterface>({
    measurment: false,
    loaded: false,
    startMeasurment: () => {},
    stopMeasurment: () => {},
    saveMeasurment: () => {},
    loadMeasurment: () => {},
    stopLoadedMeasurement: () => {},
    measurmentData: [
      {
        temperature: 0,
        humidity: 0,
        brightness: 0,
        date: "",
      },
    ],
    getMeasurements: () => [],
  });
interface MeasurementProviderProps {}

export const MeasurementProvider: React.FC<MeasurementProviderProps> = ({
  children,
}) => {
  const [measurmentVal, setMeasurmentVal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [measurmentData, setMeasurmentData] = useState<measurmentData[]>([
    { temperature: 0, humidity: 0, brightness: 0, date: "" },
  ]);
  const startMeasurment = () => {
    axios.get("http://server-for-esp32.herokuapp.com/measurement/start").then((res) => {
      if (res.data === "Measurment started") {
        setMeasurmentVal(true);
      }
    });
  };
  const stopMeasurment = () => {
    axios.get("http://server-for-esp32.herokuapp.com/measurement/stop").then((res) => {
      if (res.data === "Measurment stopped") setMeasurmentVal(false);
    });
  };
  const getMeasurements = async () => {
    const res = await axios.get("http://server-for-esp32.herokuapp.com/measurement/getAll");
    return res.data;
  };
  const saveMeasurment = (title: string) => {
    axios
      .post("http://server-for-esp32.herokuapp.com/measurement/save", {
        measurement: { title, data: measurmentData },
      })
      .then((res) => {
        console.log(res.data);
        setMeasurmentVal(false);
      });
  };
  const loadMeasurment = (id: string) => {
    axios
      .get("http://server-for-esp32.herokuapp.com/measurement/load?measurementId=" + id)
      .then((res) => {
        console.log(res.data.data, "meas data");
        setMeasurmentData(res.data.data);
        setLoaded(true);
        setMeasurmentVal(true);
      });
  };
  const stopLoadedMeasurement = () => {
    setMeasurmentVal(false);
    setLoaded(false);
  };
  const conSocket = () => {
    socket.on("measurement_data", (res: measurmentData[]) => {
      setMeasurmentVal(true);
      if (!res) return;
      var data = res.map((item) => {
        var date = new Date(item.date);
        var minutes = String(date.getMinutes());
        minutes = minutes.length === 1 ? "0" + minutes : minutes;
        return { ...item, date: date.getHours() + ":" + minutes };
      });
      setMeasurmentData(data);
    });
  };
  useEffect(() => {
    conSocket();
    return () => {
      socket.close();
      console.log("cleanup 2");
    };
  }, []);
  return (
    <MeasurementContext.Provider
      value={{
        measurment: measurmentVal,
        loaded,
        startMeasurment,
        stopMeasurment,
        saveMeasurment,
        measurmentData,
        getMeasurements,
        loadMeasurment,
        stopLoadedMeasurement,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};
