import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from "react-native";
import BookCount from "./components/BookCount";
import { Ionicons } from "@expo/vector-icons";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInput: null,
      books: []
    };
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = book => {
    this.setState({
      books: [...this.state.books, book],
      totalCount: this.state.totalCount + 1,
      readingCount: this.state.readingCount + 1
    });
    console.log(this.state.books);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView>
          <View
            style={{
              height: 70,
              borderBottomWidth: 0.5,
              borderBottomColor: "#E9E9E9",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 24 }}>Book Worm</Text>
          </View>
          {this.state.isAddNewBookVisible && (
            <View style={{ height: 50, flexDirection: "row" }}>
              <TextInput
                onChangeText={text => this.setState({ textInput: text })}
                style={{
                  flex: 1,
                  paddingLeft: 5,
                  backgroundColor: "#ececec"
                }}
                placeholder="Enter book name"
              />
              <TouchableOpacity
                onPress={() => this.addBook(this.state.textInput)}
              >
                <View
                  style={{
                    width: 50,

                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Ionicons
                    name="ios-checkmark-circle"
                    color="#89cff0"
                    size={50}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.hideAddNewBook}>
                <View
                  style={{
                    width: 50,

                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Ionicons name="ios-close-circle" color="#A9A9A9" size={50} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ flex: 1, marginTop: 500 }}>
            <TouchableOpacity
              style={{ position: "absolute", bottom: 20, right: 20 }}
              onPress={this.showAddNewBook}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#89cff0",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 30
                  }}
                >
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 70,
              borderTopWidth: 0.5,
              borderTopColor: "#E9E9E9",
              flexDirection: "row"
            }}
          >
            <BookCount title="Title" count={this.state.totalCount} />
            <BookCount title="Reading" count={this.state.readingCount} />
            <BookCount title="Read" count={this.state.readCount} />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default App;
