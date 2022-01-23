// import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "React";
import App from "../App";
// import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";

it("renders App correctly", () => {
  render(<App />)
});
