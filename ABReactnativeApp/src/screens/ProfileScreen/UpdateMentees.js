import React, { useEffect, useState, Component } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
} from "react-native";
import { firebase } from "../../firebase/config";
export default class UpdateMentees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phoneno: "",
      address: "",
      authorID: "",
      loading: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    // state value is updated by selected employee data
    console.log("user from home is...", this.props.route.params.user);
    const {
      name,
      email,
      phoneno,
      address,
      authorID,
    } = this.props.route.params.user;
    this.setState({
      name: name,
      email: email,
      phoneno: phoneno,
      address: address,
      authorID: authorID,
    });
  }

  handleChange = (value, state) => {
    this.setState({ [state]: value });
  };

    updateUser = () => {
    // destructure state
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const { name, email, phoneno, address } = this.state;
    this.setState({ errorMessage: "", loading: true });
    const entityRef = firebase
      .firestore()
      .collection("entities")
      .doc(this.props.route.params.user.id);
    entityRef
      .set({
        name: this.state.name,
        email: this.state.email,
        phoneno: this.state.phoneno,
        address: this.state.address,
        authorID: this.state.authorID,
        createdAt: timestamp,
      })
      .then((entityRef) => {
        this.setState({
          name: "",
          email: "",
          address: "",
          isLoading: false,
        });
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  };
  render() {
      const { isOpen, closeModal } = this.props;
      const { name, email, phoneno, address, loading, errorMessage } = this.state;

    return (
      <View>
        <Text>Welcome to UpdateMentees </Text>
        <Button
          title="Home"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
          color="#009378"
        >
          go to home screen
        </Button>
       
        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"Name"}
            onChangeText={(text) => this.handleChange(text,"name")}
            value={name}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"Email"}
            onChangeText={(text) => this.handleChange(text, "email")}
            value={email}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"Phone Number"}
            onChangeText={(text) => this.handleChange(text,"phoneno")}
            value={phoneno}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"Address"}
            onChangeText={(text) => this.handleChange(text,"address")}
            value={address}
          />
        </View>
        <View style={styles.button}>
          <Button title="Update" onPress={this.updateUser} color="#009378" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    // alignItems: "center",
    borderBottomWidth: 1,
    // borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 7,
  },
});
