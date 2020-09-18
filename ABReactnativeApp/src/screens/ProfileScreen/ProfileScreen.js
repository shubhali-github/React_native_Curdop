import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { firebase } from "../../firebase/config";
export default function ProfileScreen(props) {
  console.log("profile", props);
  const user = props.extraData;
  return (
    <View>
      <Text>Welcome to profile screen</Text>
      <Text>Name:{user.fullName}</Text>

      <Text>Email ID:{user.email}</Text>
    </View>
  );
}
