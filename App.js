import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

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
          <View style={{ flex: 1 }} />
          <View
            style={{
              height: 70,
              borderTopWidth: 0.5,
              borderTopColor: "#E9E9E9",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>Total</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>Reading</Text>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>Read</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
