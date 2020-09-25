import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { firebase, db } from "./../../firebase/config";
class Mentors extends Component {
  constructor(props) {
    super(props);
    console.log("Props", props);
    this.userID = props.extraData.id;
    this.dbRef = db.collection("entities");
    this.state = {
      id: "",
      name: "",
      email: "",
      phoneno: "",
      address: "",
      MenteesArr: [],
      buttontxt: "Add member",
      SetModal: false,
      isLoadings: true,
      isLoading: false,
    };
  }
  componentDidMount() {
    this.unsubscribe = this.dbRef
      .where("authorID", "==", this.userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(this.getCollection);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const MenteesArr = [];
    querySnapshot.forEach((res) => {
      const { name, email, phoneno, address, authorID, createdAt } = res.data();
      MenteesArr.push({
        address,
        name,
        createdAt,
        email,
        id: res.id,
        authorID,
        phoneno,
      });
    });
    console.log(MenteesArr);
    this.setState({
      MenteesArr,
      isLoadings: false,
    });
  };
  Removeuser = (key) => {
    const dbref = firebase.firestore().collection("entities");
    console.log("Key>>>:", key);
    dbref
      .doc(key)
      .delete()
      .then((res) => {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  changeButton() {
    this.setState({
      buttontxt: "Update member",
      SetModal: true,
    });
  }
   Signoutuser = () => {
    firebase.auth().signOut();
    console.log("SignOUT");
  };
  //delete user
   deleteuser = () => {
    const user = firebase.auth().currentUser;
    console.log(user);
    user
      .delete()
      .then(function () {
        console.log("User deleted");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  showButton = () => {
    {
      if (this.state.SetModal === false) {
        return (
          <>
            <Button
              onPress={() => this.openModal()}
              color="#009387"
              title={this.state.buttontxt}
            />
          </>
        );
      }
    }
    if (this.state.SetModal === true) {
      if (this.state.buttontxt === "Add member") {
        return (
          <>
            <Button
              onPress={() => this.storeMember()}
              color="#009387"
              title={this.state.buttontxt}
            />
          </>
        );
      }
      if (this.state.buttontxt === "Update member") {
        return (
          <>
            <Button
              onPress={() => this.updateMember()}
              color="#009387"
              title={this.state.buttontxt}
            />
          </>
        );
      }
    }
  };
  Modalview = () => {
    {
      if (this.state.SetModal == true) {
        return (
          <>
            <View style={styles.formContainer}>
              <Text>ADD/Update Members</Text>
              <TextInput
                style={styles.input}
                placeholder={"Name"}
                value={this.state.name}
                onChangeText={(val) => this.inputValueUpdate(val, "name")}
              />
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder={"Email"}
                value={this.state.email}
                onChangeText={(val) => this.inputValueUpdate(val, "email")}
              />
              <TextInput
                style={styles.input}
                placeholder={"Mobile"}
                value={this.state.phoneno}
                onChangeText={(val) => this.inputValueUpdate(val, "phoneno")}
              />
              <TextInput
                style={styles.input}
                placeholder={"Address"}
                value={this.state.address}
                onChangeText={(val) => this.inputValueUpdate(val, "address")}
              />
            </View>
          </>
        );
      }
    }
    if (this.state.SetModal == false) {
      return <></>;
    }
  };
  updateMember() {
    const userID = this.props.extraData.id;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const { name, email, phoneno, address } = this.state;
    this.setState({ errorMessage: "", loading: true });
    const entityRef = firebase
      .firestore()
      .collection("entities")
      .doc(this.state.id);
    entityRef
      .set({
        name: this.state.name,
        email: this.state.email,
        phoneno: this.state.phoneno,
        address: this.state.address,
        authorID: userID,
        createdAt: timestamp,
      })
      .then((entityRef) => {
        this.setState({
          name: "",
          email: "",
          phoneno: "",
          address: "",
          isLoading: false,
          SetModal: false,
          buttontxt: "Add member",
        });
        this.props.navigation.navigate("MentorsDashboard");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }
  Setupdateuser = (data) => {
    const userId = this.props.extraData.id;
    console.log("this.props.extraData.id", data);
    const { name, email, phoneno, address, authorID, id } = data;
    this.setState({
      id: id,
      name: name,
      email: email,
      phoneno: phoneno,
      address: address,
      authorID: authorID,
      buttontxt: "Update member",
      SetModal: true,
    });
  };
  storeMember = () => {
    if (this.state.buttontxt === "Add member") {
      const userID = this.props.extraData.id;
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      if (this.state.name === "") {
        alert("Fill at least your name!");
      } else {
        this.setState({
          isLoading: true,
        });
        this.dbRef
          .add({
            name: this.state.name,
            email: this.state.email,
            phoneno: this.state.phoneno,
            address: this.state.address,
            authorID: userID,
            createdAt: timestamp,
          })
          .then((res) => {
            this.setState({
              name: "",
              email: "",
              phoneno: "",
              address: "",
              isLoading: false,
              SetModal: false,
            });
          })
          .catch((err) => {
            console.error("Error found: ", err);
            this.setState({
              isLoading: false,
            });
          });
      }
    }
  };
  openModal = () => {
    console.log("openmodel");
    this.setState({
      SetModal: true,
    });
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  };
  renderEntity = ({ item, index }) => {
    const key = item.id;
    return (
      <View style={styles.containers}>
        <Text style={styles.buttonContainer}>{item.name}</Text>
        <Text style={styles.buttonContainer}>{item.phoneno}</Text>
        <Text style={styles.buttonContainer}>{item.email}</Text>
        <Text style={styles.buttonContainer}>{item.address}</Text>
        <Text style={{ alignItems: "flex-start" }}>
          <Button
            title="Delete"
            onPress={() => this.Removeuser(key)}
            color="#009387"
          />
        </Text>
        <Text style={{ alignItems: "flex-start" }}>
          <Button
            title="Update"
            onPress={() => this.Setupdateuser(item)}
            color="#009387"
          />
        </Text>
      </View>
    );
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <this.Modalview />
        <this.showButton />
        <Text>List of Members</Text>
        {this.state.MenteesArr && (
          <View style={styles.listContainer}>
            <FlatList
              data={this.state.MenteesArr}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item) => item.id}
              renderItem={this.renderEntity}
              removeClippedSubviews={true}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => this.Signoutuser()}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={()=>this.deleteuser()}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  formContainer: {
    width: "70%",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    height: 28,
    alignItems: "center",
    width: "30%",
    backgroundColor: "#009387",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
  },
  buttons: {
    height: 28,
    alignItems: "center",
    width: "65%",
    backgroundColor: "#808080",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
  },
  containers: {
    flex: 1,
    flexDirection: "row",
    display: "block",
    borderRadius: 3,
    justifyContent: "center",
    backgroundColor: "#808080",
    marginTop: 10,
    marginBottom: 10,
  },
  containerss: {
    flex: 1,
    flexDirection: "row",
    display: "block",
    borderRadius: 3,
    justifyContent: "center",
    backgroundColor: "#009387",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    margin: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default Mentors;
