import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomActionButton from "../components/CustomActionButton";

import * as firebase from "firebase";
import "firebase/auth";

import colors from "../assets/colors";
const SettingScreen = props => {
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      props.navigation.navigate("WelcomeScreen");
    } catch (err) {
      alert("Unable to sign out right now. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <CustomActionButton
        style={{
          width: 200,
          backgroundColor: "transparent",
          borderWidth: 0.5,
          borderColor: "#9C9C9C"
        }}
        title="Logout"
        onPress={signOut}
      >
        <Text style={{ fontWeight: "500", color: "#9C9C9C" }}>Logout</Text>
      </CustomActionButton>
    </View>
  );
};
export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain
  }
});
