import React, {
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Text, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { Button } from "react-native-elements";
import style from "../Style";
import { SenzorContext } from "../context/SenzorContext";
import { MeasurementContext } from "../context/MeasurementContext";
import Chart from "../components/Chart";
import axios from "axios";
import { Dialog } from "react-native-simple-dialogs";
import Alerts, { alertTypes } from "../components/Alerts";

interface Props {
  id?: string;
}
type measurmentData = {
  temperature: number;
  humidity: number;
  brightness: number;
  date: string;
};

export default function Measurment({ id }: Props) {
  const { measurmentData, stopMeasurment, loaded, stopLoadedMeasurement } =
    useContext(MeasurementContext);
  const [dialog, setDialog] = useState<alertTypes>(null);
  const data = useCallback(
    (senzor: "temperature" | "humidity" | "brightness") => {
      var data = measurmentData;
      if (!data) return { senzor: [0], date: ["0"] };
      return {
        date: data.map((item) => item.date),
        senzor: data.map((item) =>
          typeof item[senzor] === "string"
            ? // @ts-ignore
              parseFloat(item[senzor])
            : item[senzor]
        ),
      };
    },
    [measurmentData]
  );
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
      <Alerts Atype={dialog} setAtype={setDialog} />
      <View style={style.topResposive}></View>
      <Chart
        title="Teplota"
        color={{ r: 249, g: 95, b: 77 }}
        data={data("temperature").senzor}
        time={data("temperature").date}
      />
      <Chart
        title="Vlhkost"
        color={{ r: 89, g: 115, b: 246 }}
        data={data("humidity").senzor}
        time={data("humidity").date}
      />
      <Chart
        title="Jasnost"
        color={{ r: 246, g: 208, b: 57 }}
        data={data("brightness").senzor}
        time={data("brightness").date}
      />
      <View style={[style.bmPad, style.row]}>
        {loaded ? (
          <View style={{ width: "100%" }}>
            <Button title="Zpět" onPress={stopLoadedMeasurement} />
          </View>
        ) : (
          <>
            <Button title="Uložit měření" onPress={() => setDialog("save")} />
            <Button
              title="Zahodit měření"
              onPress={() => setDialog("sure-close")}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
