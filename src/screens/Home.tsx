import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SenzorValue from "../components/SenzorValue";
import { SenzorContext } from "../context/SenzorContext";
import { Button } from "react-native-elements";
import Measurment from "./Measurment";
import axios from "axios";
import style from "../Style";
import { MeasurementContext } from "../context/MeasurementContext";
import { Menu, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import MeasurementList from "./MeasurementList";

export default function Home() {
  const { senzorValues } = useContext(SenzorContext);
  const { measurment, startMeasurment } = useContext(MeasurementContext);
  const [visible, setVisible] = React.useState(true);
  const [anotherPage, setAnotherPage] = useState<null | "loadMeasurement">();
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const msListBack = () => setAnotherPage(null);
  if (measurment) return <Measurment />;
  if (anotherPage === "loadMeasurement")
    return <MeasurementList back={msListBack} />;
  return (
    <Provider>
      <View style={[styles.container1]}>
        <View style={[styles.row]}>
          <View style={styles.menuWrapper}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<View style={[styles.mainMenuAnchor]} />}
            >
              <Menu.Item
                onPress={() => setAnotherPage("loadMeasurement")}
                title="Načíst měření"
              />
              <Menu.Item onPress={() => {}} title="Čip esp32" />
              <Menu.Item onPress={() => {}} title="O nás" />
            </Menu>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={openMenu} style={styles.menu}>
        <Icon
          name={"ellipsis-v"}
          size={28}
          color={"black"}
          // style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Image
            style={style.logoImage}
            source={require("../../assets/weather.png")}
          />
          <View style={styles.senzorValuesContainer}>
            <SenzorValue
              name="Teplota"
              icon={{ name: "temperature-high", color: "orangered" }}
              value={senzorValues.temperature + " °C"}
            />
            <SenzorValue
              name="Vlhkost"
              icon={{ name: "hand-holding-water", color: "dodgerblue" }}
              value={senzorValues.humidity + " %"}
            />
            <SenzorValue
              name="Jasnost"
              icon={{ name: "sun", color: "gold" }}
              value={senzorValues.brightness + " %"}
            />
          </View>
        </View>
        <View style={styles.buttonBox}>
          <Button
            title="Začít měření"
            type="solid"
            style={styles.buttonBox}
            onPress={startMeasurment}
          />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: "10%",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    paddingTop: 0,
  },
  senzorValuesContainer: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    flexWrap: "wrap",
  },
  buttonBox: {
    width: "100%",
    paddingHorizontal: "12.5%",
  },
  menu: {
    padding: 15,
    // paddingBottom: 0,
    // width: "100%",
    marginTop: 15,
    left: "85%",
    // backgroundColor: "red",
  },

  container1: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    width: "100%",
  },
  mainMenuAnchor: {
    width: 24,
    height: 5,
  },
  menuWrapper: {
    alignSelf: "flex-end",
    margin: 8,
  },
});
