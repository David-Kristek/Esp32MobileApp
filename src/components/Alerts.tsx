import React, { useState, useContext } from "react";
import { View } from "react-native";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { Input } from "react-native-elements";
import { MeasurementContext } from "../context/MeasurementContext";

export type alertTypes =
  | null
  | "save"
  | "sure-close"
  | "confirm-save"
  | "confirm-close"
  | "cancel";

interface Props {
  Atype: alertTypes;
  setAtype: (prm: alertTypes) => void;
}

export default function Alerts({ Atype, setAtype }: Props) {
  return (
    <>
      <SaveAlert visible={Atype === "save"} setAtype={setAtype} />
      <CloseAlert visible={Atype === "sure-close"} setAtype={setAtype} />
    </>
  );
}
interface alertProps {
  visible: boolean;
  setAtype: (prm: alertTypes) => void;
}
function SaveAlert({ visible, setAtype }: alertProps) {
  const [title, setTitle] = useState("");
  const { saveMeasurment } = useContext(MeasurementContext);
  return (
    <ConfirmDialog
      title="Uložit měření"
      message="Napište jméno měření"
      visible={visible}
      onTouchOutside={() => setAtype(null)}
      positiveButton={{
        title: "Uložit",
        onPress: () => {
          if (title) saveMeasurment(title);
        },
      }}
      negativeButton={{
        title: "Zpět",
        onPress: () => setAtype("cancel"),
      }}
    >
      <Input
        placeholder="Jméno měření"
        onChangeText={(value) => {
          setTitle(value);
        }}
      />
    </ConfirmDialog>
  );
}
function CloseAlert({ visible, setAtype }: alertProps) {
  const { stopMeasurment } = useContext(MeasurementContext);
  return (
    <ConfirmDialog
      title="Zahodit měření"
      message="Jste si jistí"
      visible={visible}
      onTouchOutside={() => setAtype(null)}
      positiveButton={{
        title: "Uložit",
        onPress: () => {
          stopMeasurment();
        },
      }}
      negativeButton={{
        title: "Zpět",
        onPress: () => setAtype("cancel"),
      }}
    />
  );
}
