import React, { Component, useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
//import { Table, Row, Rows } from "react-native-table-component";
import styles from "./Style";
import { firebase, db } from "../../firebase/config";
export default class AllMentees extends Component {
  constructor(props) {
    super(props);
    this.dbRef = db.collection("mentees");
    this.userID = this.props.extraData.id;
    this.state = {
      name: "",
      email: "",
      phoneno: "",
      address: "",
      Allmentees: [],
      data: [],
      HeadTable: ["Name", "Phone Number", "Email-Id", "Address", "", ""],
      isLoadings: true,
      isLoading: false,
      DataTable: [
        ["1", "2", "3", "4", "5"],
        ["a", "b", "c", "d", "e"],
        ["1", "2", "3", "4", "5"],
        ["a", "b", "c", "d", "e"],
        ["1", "2", "3", "4", "5"],
      ],
    };
  }
  componentDidMount() {
    this.unsubscribe = this.dbRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  entityRef = firebase.firestore().collection("mentees");
  userID = this.props.extraData.id;
  navigation = this.props.navigation;
  getCollection = (querySnapshot) => {
    const Allmentees = [];
    querySnapshot.forEach((res) => {
      const { name, email, phoneno, address, authorID, createdAt } = res.data();
      Allmentees.push({
        address,
        name,
        createdAt,
        email,
        id: res.id,
        authorID,
        phoneno,
      });
    });
    console.log("typeof(this.state.AllMentees)", typeof this.state.AllMentees);
    console.log("Allmentess", Allmentees);
    console.log("datatable", this.state.DataTable);
    console.log("object to array", Object.values(this.state.Allmentees));
    this.setState({
      Allmentees,
      isLoadings: false,
    });
  };
  //remove mentees..
  AddasMymentees = (item) => {
    console.log("item==", item);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      name: item.name,
      email: item.email,
      phoneno: item.phoneno,
      address: item.address,
      authorID: this.userID,
      createdAt: timestamp,
    };
    this.entityRef.add(data);
  };
  onAddButtonPress = () => {
    if (entityName && entityName.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        name: entityName,
        email: email,
        phoneno: phoneno,
        address: address,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityName("");
          setAddress("");
          setEmail("");
          setPhoneno("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
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
            title="ADD Mentees"
            onPress={() => this.AddasMymentees(item)}
            color="#009387"
          />
        </Text>
      </View>
    );
  };
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        {this.state.Allmentees && (
          <View style={styles.listContainer}>
            <Text>List of All Member.....</Text>
            <FlatList
              data={this.state.Allmentees}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item) => item.id}
              renderItem={this.renderEntity}
              removeClippedSubviews={true}
            />
          </View>
        )}
      </View>
    );
  }
}
