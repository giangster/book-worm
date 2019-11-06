import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import LogInScreen from "./screens/LogInScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BooksReadingScreen from "./screens/HomeTabNavigator/BooksReadingScreen";
import BooksReadScreen from "./screens/HomeTabNavigator/BooksReadScreen";
import CustomDrawerComponent from "./screens/DrawerNavigator/CustomDrawerComponent";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { fromBinary } from "uuid-js";
import colors from "./assets/colors";
import * as firebase from "firebase";
import { firebaseConfig } from "./config/config";

class App extends Component {
  constructor() {
    super();
    this.initializeFirebase();
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };

  render() {
    return <AppContainer />;
  }
}

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null
      }
    },
    LogInScreen
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain
      }
    }
  }
);

const HomeTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Total"
    }
  },
  BooksReadingScreen: {
    screen: BooksReadingScreen,
    navigationOptions: {
      tabBarLabel: "Reading"
    }
  },
  BooksReadScreen: {
    screen: BooksReadScreen,
    navigationOptions: {
      tabBarLabel: "Read"
    }
  }
});

const HomeStackNavigator = createStackNavigator({
  HomeTabNavigator
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={24} />
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />
      }
    }
  },
  {
    contentComponent: CustomDrawerComponent
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
