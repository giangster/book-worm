import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
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
import Swipeout from "react-native-swipeout";

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
      .ref("users")
      .child(user.uid)
      .once("value");

    const books = await firebase
      .database()
      .ref("books")
      .child(user.uid)
      .once("value");

    const booksArray = snapshotToArray(books);

    this.setState({
      currentUser: currentUserData.val()
    });

    this.props.loadAllBooks(booksArray.reverse());
    this.props.isLoadingBook(false);
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
    this.textInputRef.setNativeProps({ text: "" });
    this.setState({ textInputdata: "" });
    this.props.isLoadingBook(true);

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

        const response = await firebase
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .child(key)
          .set({ name: book, read: false });

        this.props.addBook({ name: book, read: false, key: key });
        this.props.isLoadingBook(false);
      }
    } catch (err) {
      console.log(err);
      this.props.isLoadingBook(false);
    }
  };

  markAsRead = async (selectedBook, index) => {
    this.props.isLoadingBook(true);

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

      this.props.markBookAsRead(selectedBook);
      this.props.isLoadingBook(false);
    } catch (err) {
      console.log(err);
      this.props.isLoadingBook(false);
    }
  };

  markAsUnread = async (selectedBook, index) => {
    try {
      this.props.isLoadingBook(true);

      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: false });

      this.props.markBookAsUnread(selectedBook);
      this.props.isLoadingBook(false);
    } catch (error) {
      console.log(error);
      this.props.isLoadingBook(false);
    }
  };

  deleteBook = async (selectedBook, index) => {
    try {
      this.props.isLoadingBook(true);

      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .remove();

      this.props.deleteBook(selectedBook);
      this.props.isLoadingBook(false);
    } catch (error) {
      console.log(error);
      this.props.isLoadingBook(false);
    }
  };

  renderItem = (item, index) => {
    let swipeoutButtons = [
      {
        text: "Delete",
        component: (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="ios-trash" size={24} color={colors.bgMain} />
          </View>
        ),
        backgroundColor: colors.bgDelete,
        onPress: () => this.deleteBook(item, index)
      }
    ];

    if (!item.read) {
      swipeoutButtons.unshift({
        text: "Mark Read",
        component: (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: colors.bgMain, fontWeight: "600" }}>
              Mark as Read
            </Text>
          </View>
        ),
        backgroundColor: colors.bgPrimary,
        onPress: () => this.markAsRead(item, index)
      });
    } else {
      swipeoutButtons.unshift({
        text: "Mark Unread",
        component: (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: colors.bgMain, fontWeight: "600" }}>
              Mark as unread
            </Text>
          </View>
        ),
        backgroundColor: colors.bgTextInput,
        onPress: () => this.markAsUnread(item, index)
      });
    }
    return (
      <Swipeout
        autoClose={true}
        style={{ marginHorizontal: 5, marginVertical: 5 }}
        backgroundColor={colors.bgMain}
        right={swipeoutButtons}
      >
        <ListItem
          onPress={() => this.addBookImage(item)}
          editable={true}
          marginVertical={0}
          item={item}
        >
          {item.read && (
            <View style={styles.bookReadIcon}>
              <Ionicons
                style={{ marginRight: 5 }}
                name="ios-checkmark-circle"
                color={colors.logoColor}
                size={40}
              />
            </View>
          )}
        </ListItem>
      </Swipeout>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />

        {this.props.isLoading && (
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
        {/* <View style={styles.container}> */}
        <FlatList
          data={this.props.books.books}
          renderItem={({ item }, index) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            !this.props.books.isLoading && (
              <View style={styles.listEmptyComponent}>
                <Text style={styles.listEmptyComponentText}>
                  You are not reading any books
                </Text>
              </View>
            )
          }
        />

        <Animatable.View
          animation={
            this.state.textInputdata.length > 0
              ? "slideInRight"
              : "slideOutRight"
          }
        >
          <CustomActionButton
            position="right"
            style={styles.addNewBookButton}
            onPress={() => this.addBook(this.state.textInputdata)}
          >
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>
        </Animatable.View>
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

const mapDispatchToProps = dispatch => ({
  loadAllBooks: books =>
    dispatch({ type: "LOAD_BOOKS_FROM_SERVER", payload: books }),
  addBook: book => dispatch({ type: "ADD_BOOK", payload: book }),
  markBookAsRead: book =>
    dispatch({ type: "MARK_BOOK_AS_READ", payload: book }),
  isLoadingBook: boolean =>
    dispatch({ type: "TOGGLE_IS_LOADING_BOOKS", payload: boolean }),
  markBookAsUnread: book =>
    dispatch({ type: "MARK_BOOK_AS_UNREAD", payload: book }),
  deleteBook: book => dispatch({ type: "DELETE_BOOK", payload: book })
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
