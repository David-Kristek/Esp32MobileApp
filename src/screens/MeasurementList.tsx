import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MeasurementContext } from "../context/MeasurementContext";
import dateFormat from "dateformat";
import style from "../Style";
import { Button } from "react-native-elements";

type msData = {
  _id: string;
  title: string;
  createdAt: Date;
};
interface Props {
  back: () => void;
}
export default function MeasurementList({ back }: Props) {
  const { getMeasurements, loadMeasurment } = useContext(MeasurementContext);
  const [msList, setMsList] = useState<msData[]>();
  useEffect(() => {
    let isActive = true;
    getMeasurements().then((res: any) => {
      if (isActive) setMsList(res);
    });
    return () => {
      isActive = false;
    };
  }, []);
  const Item = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => loadMeasurment(item._id)}
      >
        <Text
          style={[styles.title, item.title.length > 12 && { fontSize: 23 }]}
        >
          {item.title}{" "}
        </Text>
        <Text style={styles.date}>
          {dateFormat(new Date(item.createdAt), "H:MM, d.m.")}
        </Text>
      </TouchableOpacity>
    );
  };
  if (!msList) return <></>;
  return (
    <>
      <FlatList
        data={msList}
        renderItem={Item}
        keyExtractor={(item) => item._id}
        style={style.topResposive}
      />
      <Button title="Zpět" onPress={back} />
    </>
  );
}
const styles = StyleSheet.create({
  item: {
    // backgroundColor: "grey",
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
    paddingRight: 20,
  },
  date: {
    fontSize: 18,
    color: "black",
  },
});
