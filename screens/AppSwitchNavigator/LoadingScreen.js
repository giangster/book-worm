import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import colors from "../../assets/colors";

import * as firebase from "firebase";

import "firebase/auth";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("HomeScreen", { user });
      } else {
        this.props.navigation.navigate("LoginStackNavigator");
      }
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.logoColor} />
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
