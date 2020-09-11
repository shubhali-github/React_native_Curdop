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
    return(
        <View>
            <Text>Welcome to profile screen</Text>
            <Button title="Home"
                onPress={() => {
                    props.navigation.navigate("Home") }} >
                     go to home screen</Button>
        </View>
    )
}