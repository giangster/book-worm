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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0
    };
  }
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
          <View style={{ height: 50 }}>
            <TextInput style={{ flex: 1, backgroundColor: "grey" }}></TextInput>
          </View>
          <View style={{ flex: 1, marginTop: 550 }}>
            <TouchableOpacity
              style={{ position: "absolute", bottom: 20, right: 20 }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#AAD1E6",
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
