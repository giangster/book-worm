import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../assets/colors";

const ListItem = ({ item, children }) => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </View>
      <View style={styles.listItemTitleContainer}>
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
      </View>
      {children}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    minHeight: 80,
    marginHorizontal: 10,
    flexDirection: "row",
    backgroundColor: colors.bgMain,
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: colors.bgPrimary
  },
  imageContainer: {
    width: 60,
    height: 60,
    margin: 10,
    marginVertical: 10
  },
  image: { flex: 1, height: null, width: null, borderRadius: 30 },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
    color: "grey"
  }
});
