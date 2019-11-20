import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import colors from "../../assets/colors";
import ListItem from "../../components/ListItem";
import { connect } from "react-redux";

const BooksReadScreen = props => {
  const renderItem = item => <ListItem item={item} />;

  return (
    <View style={styles.container}>
      {props.isLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            elevation: 1000
          }}
        >
          <ActivityIndicator size="large" color={colors.logoColor} />
        </View>
      )}
      <FlatList
        data={props.books.booksRead}
        renderItem={({ item }, index) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          !props.books.isLoading && (
            <View style={styles.listEmptyComponent}>
              <Text style={styles.listEmptyComponentText}>
                You have not read any books
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center"
  },
  listEmptyComponentText: {
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps, null)(BooksReadScreen);
