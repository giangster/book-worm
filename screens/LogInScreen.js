import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../assets/colors";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import CustomActionButton from "../components/CustomActionButton";

class LogInScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            placeholder="abc@example.com"
            placeholderTextColor={colors.bgTextInput}
            keyboardType="email-address"
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={colors.bgTextInput}
            secureTextEntry
          ></TextInput>
          <View style={{ alignItems: "center" }}>
            <CustomActionButton style={styles.loginButtons}>
              <Text style={{ fontWeight: "500", color: "#89cff0" }}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
              style={[styles.loginButtons, { borderColor: "#9C9C9C" }]}
            >
              <Text style={{ fontWeight: "500", color: "#9C9C9C" }}>
                Sign Up
              </Text>
            </CustomActionButton>
          </View>
        </View>
        <View style={{ flex: 1 }} />
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
    width: 300,
    padding: 5,
    borderWidth: 0.5,
    borderColor: "grey",
    marginHorizontal: 40,
    marginBottom: 10,
    color: "grey",
    paddingHorizontal: 10
  },
  loginButtons: {
    width: 200,
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: colors.bgPrimary,
    marginBottom: 10
  }
});
