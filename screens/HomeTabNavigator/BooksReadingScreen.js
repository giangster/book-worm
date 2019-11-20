import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, ListItem } from "react-native";
import colors from "../../assets/colors";

class BooksReadingScreen extends Component {
  renderItem = item => <ListItem item={item}></ListItem>;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.books.books}
          renderItem={({ item }, index) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={styles.listEmptyComponent}>
              <Text style={styles.listEmptyComponentText}>
                You are not reading any books
              </Text>
            </View>
          }
        />
      </View>
    );
  }
}

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

export default connect(mapStateToProps, null)(BooksReadingScreen);
