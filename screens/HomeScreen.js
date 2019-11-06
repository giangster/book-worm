import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import BookCount from "../components/BookCount";
import { Ionicons } from "@expo/vector-icons";
import CustomActionButton from "../components/CustomActionButton";
import colors from "../assets/colors";
import * as firebase from "firebase/app";
import { snapshotToArray } from "../helpers/firebaseHelpers";

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      books: [],
      booksReading: [],
      booksRead: [],
      textInputdata: ""
    };
    console.log("constructor");
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam("user");

    const currentUserData = await firebase
      .database()
      .ref(`users`)
      .child(user.uid)
      .once("value");

    const books = await firebase
      .database()
      .ref("books")
      .child(user.uid)
      .once("value");

    const booksArray = snapshotToArray(books);
    this.setState({ currentUser: currentUserData.val(), books: booksArray });
  };

  componentDidUpdate() {
    console.log("update");
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = async book => {
    try {
      //books
      //users uid
      //book id(key)
      //books data

      const snapshot = await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .orderByChild("name")
        .equalTo(book)
        .once("value");

      if (snapshot.exists()) {
        alert("Book already exists");
      } else {
        const key = await firebase
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .push().key;
      }
      const key = await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .push().key;

      const response = await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(key)
        .set({ name: book, read: false });

      this.setState({
        books: [...this.state.books, book],
        booksReading: [...this.state.books, book],
        // totalCount: state.totalCount + 1,
        // readingCount: state.readingCount + 1
        isAddNewBookVisible: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  markAsRead = (selectedBook, index) => {
    let books = this.state.books.filter(book => book !== selectedBook);
    let booksReading = this.state.booksReading.filter(
      book => book != selectedBook
    );

    this.setState({
      books: books,
      booksReading: booksReading,
      booksRead: [...this.state.booksRead, selectedBook],
      readingCount: this.state.readingCount - 1,
      readCount: this.state.readCount + 1
    });
  };

  renderItem = (item, index) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item.name}</Text>
      </View>
      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>Mark as read</Text>
      </CustomActionButton>
    </View>
  );
  render() {
    console.log("render");
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>
        <View style={styles.container}>
          {this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
                onChangeText={text => this.setState({ textInputdata: text })}
              />
              <CustomActionButton
                style={styles.checkmarkButton}
                onPress={() => this.addBook(this.state.textInputdata)}
              >
                <Ionicons
                  name="ios-checkmark-circle"
                  size={40}
                  color="#89cff0"
                />
              </CustomActionButton>
              <CustomActionButton onPress={this.hideAddNewBook}>
                <Ionicons name="ios-close-circle" size={40} color="#deada5" />
              </CustomActionButton>
              {/* <TouchableOpacity
                onPress={() => this.addBook(this.state.textInputdata)}
              >
                <View
                  style={{
                    width: 50,
                    backgroundColor: colors.bgSuccess,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Ionicons name="ios-checkmark" size={40} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.hideAddNewBook}>
                <View
                  style={{
                    width: 50,
                    backgroundColor: '#deada5',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Ionicons name="ios-close" size={40} color="white" />
                </View>
              </TouchableOpacity> */}
            </View>
          )}

          <FlatList
            data={this.state.books}
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
          <CustomActionButton
            position="right"
            style={styles.addNewBookButton}
            onPress={this.showAddNewBook}
          >
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>
        </View>

        <View style={styles.footer}>
          <BookCount count={this.state.books.length} title="Total" />
          <BookCount count={this.state.booksReading.length} title="Reading" />
          <BookCount count={this.state.booksRead.length} title="Read" />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    fontSize: 24
  },
  textInputContainer: {
    height: 50,
    flexDirection: "row"
  },
  textInput: {
    marginLeft: 5,
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.txtPlaceholder,
    backgroundColor: colors.bgMain,
    paddingLeft: 5
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess
  },
  listItemContainer: {
    height: 50,
    flexDirection: "row",
    color: "grey"
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
    color: "grey"
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center"
  },
  listEmptyComponentText: {
    fontWeight: "bold"
  },
  markAsReadButton: {
    width: 100,
    backgroundColor: colors.bgPrimary
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "white"
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25
  },
  addNewBookButtonText: {
    color: "white",
    fontSize: 30
  },
  footer: {
    height: 70,
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor
  }
});
5.4;

export default HomeScreen;
