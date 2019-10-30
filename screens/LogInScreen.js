import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../assets/colors";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import CustomActionButton from "../components/CustomActionButton";
import * as firebase from "firebase";
import "firebase/auth";

class LogInScreen extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "", isLoading: false };
  }

  onSignIn = async () => {
    const { email, password } = this.state;

    //Early return technique
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
      } catch (err) {
        switch (err.code) {
          case "auth/user-not-found":
            alert("User does not exists. Try signing up");
            break;

          case "auth/invalid-email":
            alert("Please enter a valid email");
        }
      }
    }
  };

  onSignUp = async () => {
    const { email, password } = this.state;

    //Early return technique
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
      } catch (err) {
        if (err.code == "auth/email-already-in-use") {
          alert("User already exists. Try logging in");
        }
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            placeholder="abc@example.com"
            placeholderTextColor={colors.bgTextInput}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email: email })}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={colors.bgTextInput}
            secureTextEntry
            onChangeText={password => this.setState({ password: password })}
          ></TextInput>
          <View style={{ alignItems: "center" }}>
            <CustomActionButton
              style={styles.loginButtons}
              onPress={this.onSignIn}
            >
              <Text style={{ fontWeight: "500", color: "#89cff0" }}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
              style={[styles.loginButtons, { borderColor: "#9C9C9C" }]}
              onPress={this.onSignUp}
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
