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
export default function MenteesDashboard(props) {
  const [entityName, setEntityName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [mentees, setEntities] = useState([]);
  const entityRef = firebase.firestore().collection("mentees");
  const userID = props.extraData.id;
  const navigation = props.navigation;
  useEffect(() => {
    entityRef
      .where("authorID", "==", userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(
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
  //Signout user
  const Signoutuser = () => {
    firebase.auth().signOut();
    console.log("SignOUT");
    // navigation.navigate("Login");
  };
  //delete user
  const deleteuser = () => {
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
  //Update mentees
  const updateuser = (data) => {
    navigation.navigate("UpdateMentees", { user: data });
  };
  //remove mentees..
  const Removeuser = (key) => {
    const dbref = firebase.firestore().collection("mentees");
    console.log("Key>>>:", key);
    dbref
      .doc(key)
      .delete()
      .then((res) => {
        // navigation.navigate("Profile");
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
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
            title="Delete"
            onPress={() => Removeuser(key)}
            color="#009387"
          />
        </Text>
        <Text style={{ alignItems: "flex-start" }}>
          <Button
            title="Update"
            onPress={() => updateuser(item)}
            color="#009387"
          />
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityName(text)}
          value={entityName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter contact number"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhoneno(text)}
          value={phoneno}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAddress(text)}
          value={address}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
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
      {/* <TouchableOpacity style={styles.buttons} onPress={Signoutuser}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={deleteuser}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity> */}
    </View>
  );
}
