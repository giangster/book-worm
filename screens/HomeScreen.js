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
import { setCustomText } from "react-native-global-props";
import { Ionicons } from "@expo/vector-icons";
import CustomActionButton from "../components/CustomActionButton";
import colors from "../assets/colors";
import * as firebase from "firebase/app";
import { snapshotToArray } from "../helpers/firebaseHelpers";
import ListItem from "../components/ListItem";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      books: [],
      booksReading: [],
      booksRead: [],
      textInputdata: ""
    };
    this.textInputRef = null;
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
    this.setState({
      currentUser: currentUserData.val(),
      books: booksArray,
      booksReading: booksArray.filter(book => book != book.read),
      booksRead: booksArray.filter(book => book.read)
    });

    this.props.loadAllBooks(booksArray);
    console.log(this.props.books);
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
        books: [...this.state.books, { name: book, read: false }],
        booksReading: [...this.state.books, { name: book, read: false }],
        totalCount: state.totalCount + 1,
        readingCount: state.readingCount + 1
      });
    } catch (err) {
      console.log(err);
    }

    this.textInputRef.setNativeProps({ text: "" });
    this.setState({ textInputdata: "" });
  };

  markAsRead = async (selectedBook, index) => {
    try {
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: true });

      let books = this.state.books.map(book => {
        if (book.name === selectedBook.name) {
          return { ...book, read: true };
        }
        return book;
      });
      let booksReading = this.state.booksReading.filter(
        book => book != selectedBook.name
      );

      this.setState({
        books: books,
        booksReading: booksReading,
        booksRead: [
          ...this.state.booksRead,
          { name: selectedBook.name, read: true }
        ],
        readingCount: this.state.readingCount - 1,
        readCount: this.state.readCount + 1
      });
    } catch (err) {
      console.log(err);
    }
  };

  renderItem = (item, index) => (
    <ListItem item={item}>
      {item.read ? (
        <View style={styles.bookReadIcon}>
          <Ionicons name="ios-checkmark-circle" size={40} color="#89cff0" />
        </View>
      ) : (
        <CustomActionButton
          style={styles.markAsReadButton}
          onPress={() => this.props.markAsRead(item, index)}
        >
          <Text style={{ color: colors.bgMain, fontWeight: "600" }}>
            Mark as read
          </Text>
        </CustomActionButton>
      )}
    </ListItem>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Book Name"
            placeholderTextColor="grey"
            onChangeText={text => this.setState({ textInputdata: text })}
            clearButtonMode="always"
            ref={component => {
              this.textInputRef = component;
            }}
          />
        </View>
        <View style={styles.container}>
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
          {this.state.textInputdata.length ? (
            <Animatable.View
              animation={
                this.state.textInputdata.length
                  ? "slideInRight"
                  : "slideOutRight"
              }
            >
              <CustomActionButton
                position="right"
                style={styles.addNewBookButton}
                onPress={() => this.props.addBook(this.state.textInputdata)}
              >
                <Text style={styles.addNewBookButtonText}>+</Text>
              </CustomActionButton>
            </Animatable.View>
          ) : null}
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
    height: 80,
    flexDirection: "row"
  },
  textInput: {
    margin: 10,
    flex: 1,
    borderWidth: 0.5,
    borderColor: colors.txtPlaceholder,
    backgroundColor: colors.bgMain,
    padding: 10,
    fontSize: 20
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess
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
    marginVertical: 15,
    marginRight: 10,
    backgroundColor: colors.bgPrimary
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "white"
  },
  bookReadIcon: { marginVertical: 20, marginRight: 10 },
  addNewBookButton: {
    backgroundColor: "#354D58DA",
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

const customTextProps = {
  style: {
    fontFamily: "Avenir-Book"
  }
};

setCustomText(customTextProps);

const mapStateToProps = state => ({
  books: state.books
});

const mapDispatchToProps = dispatch => {
  return {
    loadAllBooks: books =>
      dispatch({ type: "LOAD_BOOKS_FROM_SERVER", payload: books }),
    addBook: book => {
      dispatch({ type: "ADD_BOOK", payload: book });
    },
    markBookAsRead: book => {
      dispatch({ type: "MARK_BOOK_AS_READ", payload: book });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
