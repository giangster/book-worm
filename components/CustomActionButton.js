import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const CustomActionButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
};

CustomActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  style: PropTypes.object
};

CustomActionButton.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    color: "#89cff0",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default CustomActionButton;
