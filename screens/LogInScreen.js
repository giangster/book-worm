import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../assets/colors";
import { TextInput } from "react-native-gesture-handler";

class LogInScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput}></TextInput>
        <TextInput style={styles.textInput}></TextInput>
      </View>
    );
  }
}
export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10
  }
});
