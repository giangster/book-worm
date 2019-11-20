import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";

const BookCountContainer = ({ color, type, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: color }}>{props.books[type].length || 0}</Text>
    </View>
  );
};
const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps)(BookCountContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
