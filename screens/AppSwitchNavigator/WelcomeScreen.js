import React from "react";
import { View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";

const WelcomeScreen = props => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
      <View
        style={{
          flex: 1,
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Ionicons name="ios-book" size={150} color={colors.logoColor} />
        <Text style={{ fontSize: 50, fontWeight: "200", color: "#89cff0" }}>
          Book Worm
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 0.5,
            borderColor: colors.bgPrimary,
            marginBottom: 10
          }}
          title="Login"
          onPress={() => props.navigation.navigate("LogInScreen")}
        >
          <Text style={{ fontWeight: "500", color: "#89cff0" }}>Login</Text>
        </CustomActionButton>
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 0.5,
            borderColor: "#9C9C9C"
          }}
          title="Sign Up"
          onPress={() => props.navigation.navigate("LogInScreen")}
        >
          <Text style={{ fontWeight: "500", color: "#9C9C9C" }}>Sign Up</Text>
        </CustomActionButton>
      </View>
    </View>
  );
};

export default WelcomeScreen;
