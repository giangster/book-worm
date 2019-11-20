import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import colors from "../../assets/colors";
import ListItem from "../../components/ListItem";
import { connect } from "react-redux";

const BooksReadScreen = props => {
  const renderItem = item => <ListItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={props.books.booksRead}
        renderItem={({ item }, index) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.listEmptyComponent}>
            <Text style={styles.listEmptyComponentText}>
              You have not read any books
            </Text>
          </View>
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
