import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Button,
  TouchableHighlight,
} from "react-native";
import styles from "./Style";
import { firebase } from "../../firebase/config";
export default function AllMentees(props) {
  const [entityName, setEntityName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [mentees, setEntities] = useState([]);
  const entityRef = firebase.firestore().collection("mentees");
  const userID = props.extraData.id;
  const navigation = props.navigation;
  useEffect(() => {
    entityRef.orderBy("createdAt", "desc").onSnapshot(
      (querySnapshot) => {
        const newEntities = [];
        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });
        setEntities(newEntities);
        console.log("Entity are::::", newEntities);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  //remove mentees..
  const AddasMymentees = (item) => {
    console.log("item==", item);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      name: item.name,
      email: item.email,
      phoneno: item.phoneno,
      address: item.address,
      authorID: userID,
      createdAt: timestamp,
    };
    entityRef.add(data);
  };
  const onAddButtonPress = () => {
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
  const FlatListItemSeparator = () => {
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
  const renderEntity = ({ item, index }) => {
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
            onPress={() => AddasMymentees(item)}
            color="#009387"
          />
        </Text>
        {/*
        </Text>
        <Text style={{ alignItems: "flex-start" }}>
          <Button
            title="Update"
            onPress={() => updateuser(item)}
            color="#009387"
          />
        </Text> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {mentees && (
        <View style={styles.listContainer}>
          <Text>List of Mentees.....</Text>
          <FlatList
            data={mentees}
            ItemSeparatorComponent={FlatListItemSeparator}
            keyExtractor={(item) => item.id}
            renderItem={renderEntity}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
}
