import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import style from "../Style";
interface Props {
  name: string;
  icon: { name: string; color: string };
  value: string;
}

export default function SenzorValue({ name, icon, value }: Props) {

  return (
    <View style={styles.senzorBox}>
      <View style={styles.senzorHeading}>
        <Text style={style.font1}>{name}</Text>
        <Icon
          name={icon.name}
          size={24}
          color={icon.color}
          style={styles.icon}
        />
      </View>
      <Text style={[style.font2, styles.value]}>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  senzorBox: {
    alignItems: "center",
    paddingTop: 15,
  },
  icon: {
    paddingLeft: 5,
  },
  senzorHeading: {
    alignItems: "center",
    flexDirection: "row",
  },
  value: {
    paddingTop: 7,
    fontWeight: "bold",
  },
});
