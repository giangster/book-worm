import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Image
} from "react-native";

import { DrawerItems } from "react-navigation-drawer";
import colors from "../../assets/colors";

const CustomDrawerNavigator = props => {
  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: colors.bgMain }} />
      <View
        style={{
          height: 150,
          backgroundColor: colors.bgMain,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: Platform.OS == "android" ? 20 : 0
        }}
      >
        <Image
          style={{ width: 70, height: 70, marginBottom: 20 }}
          source={require("../../assets/icon.png")}
        />
        <Text style={{ fontSize: 24, color: "#89cff0", fontWeight: "100" }}>
          Book Worm
        </Text>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  );
};

export default CustomDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
