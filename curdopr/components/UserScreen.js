import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Button,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "./../database/firebaseDb";
import { List } from "react-native-paper";

class UserScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection("users");
    this.state = {
      isLoading: true,
      userArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

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
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, email, address } = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        email,
        address,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.MainContainer}>
          <FlatList
            data={this.state.userArr}
            width="100%"
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => (
              <View style={styles.containers}>
                <Text style={styles.buttonContainer}>{item.name}</Text>
                <Text style={styles.buttonContainer}>{item.email}</Text>
                <Text style={styles.buttonContainer}>{item.address}</Text>
                <View style={styles.buttonContainers}>
                  <Button
                    title="Show Empoyee"
                    onPress={() => {
                      this.props.navigation.navigate("UserDetailScreen", {
                        userkey: item.key,
                      });
                    }}
                  />
                </View>
              </View>
            )}
          />
          {/* 
        {this.state.userArr.map((item, i) => {
          return (
            // <ListItem
            //   key={i}
            //   chevron
            //   bottomDivider
            //   title={item.name}
            //   subtitle={item.email}
            //   onPress={() => {
            //     this.props.navigation.navigate("UserDetailScreen", {
            //       userkey: item.key,
            //     });
            //   }}
            // />



            <>
              <Text>{item.name}</Text>
            </>
          );
        })} */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  containers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    margin: 3,
    backgroundColor: "pink",
  },
  buttonContainers: {
    flex: 1,
    margin: 3,
  },
});

export default UserScreen;
