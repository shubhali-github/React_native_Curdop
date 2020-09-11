import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import { decode, encode } from "base-64";
import { firebase } from "./src/firebase/config";
import UpdateMentees from "./src/screens/ProfileScreen/UpdateMentees";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              options={{
                title: "My home",
                headerStyle: {
                  backgroundColor: "#009387",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: "My Profile",
                headerStyle: {
                  backgroundColor: "#009387",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="updatementees"
              component={UpdateMentees}
              options={{
                title: "Update Mentees",
                headerStyle: {
                  backgroundColor: "#009387",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "LogIn",
                headerStyle: {
                  backgroundColor: "#009387",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                title: "Registration page",
                headerStyle: {
                  backgroundColor: "#009387",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
