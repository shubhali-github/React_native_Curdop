import "react-native-gesture-handler";
import { View, TouchableOpacity, Image } from "react-native";
import { decode, encode } from "base-64";
import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { firebase } from "./src/firebase/config";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import Mentoors from "./src/screens/MentorsScreen/MentorsScreen";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import MemberDashboard from "./src/screens/MenteesDashboard/MenteesDashboard";
import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import AllMember from "./src/screens/MenteesDashboard/AllMentees";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={{
            uri:
              "https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png",
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  switch (routeName) {
    case "HomeScreen":
      return "Home";
    case "ExploreScreen":
      return "Explore";
    case "BottomTabStack":
      return "Home";
  }
}
// function BottomTabStack() {
//   const user = global.SampleVar;
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeScreen"
//       tabBarOptions={{
//         activeTintColor: "Black",
//         inactiveTintColor: "#fff",
//         style: {
//           backgroundColor: "#009387",
//         },
//         labelStyle: {
//           textAlign: "center",
//           fontSize: 16,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Mentoors"
//         options={{
//           tabBarLabel: "Mentoors",
//         }}
//       >
//         {(props) => <Mentoors {...props} extraData={user} />}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }

function MentorsScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Mentors"
        // component={BottomTabStack}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#009387",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        {(props) => <Mentoors {...props} extraData={global.SampleVar} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
function ProfileScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#009387", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        options={{
          title: "Profile", //Set Header Title
        }}
      >
        {(props) => <ProfileScreen {...props} extraData={global.SampleVar} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
function HomeScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#009387", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        options={{
          title: "Home", //Set Header Title
        }}
      >
        {(props) => <HomeScreen {...props} extraData={global.SampleVar} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function MemberScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#009387", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="MemberScreen"
        options={{
          title: "My Member", //Set Header Title
        }}
      >
        {(props) => <MemberDashboard {...props} extraData={global.SampleVar} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AllMemberScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#009387", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="MemberScreen"
        options={{
          title: "All Member", //Set Header Title
        }}
      >
        {(props) => (
          <AllMember {...props} extraData={global.SampleVar} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function Stacks() {
  const [loading, setLoading] = useState(true);
  const [userrr, setUser] = useState(null);
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
            console.log("Bottomtab stack UserData->>>>", userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);
  console.log("....userrr->>>.", userrr);
  global.SampleVar = userrr;

  if (loading) {
    return <></>;
  }
  console.log(" global.SampleVar:", global.SampleVar);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#009387",
          itemStyle: { marginVertical: 5 },
        }}
      >
        {userrr ? (
          <>
            <Drawer.Screen
              name="Home"
              options={{ drawerLabel: "Home" }}
              component={HomeScreenStack}
            />
            <Drawer.Screen name="Menees" options={{ drawerLabel: "My Member" }}>
              {(props) => <MemberScreenStack {...props} extraData={userrr} />}
            </Drawer.Screen>
            <Drawer.Screen
              name="AllMember"
              options={{ drawerLabel: "All Member" }}
            >
              {(props) => <AllMemberScreenStack {...props} extraData={userrr} />}
            </Drawer.Screen>
            <Drawer.Screen
              name="MemberDashboard"
              options={{ drawerLabel: "Mentors" }}
              component={MentorsScreenStack}
            />
            <Drawer.Screen
              name="Profile"
              options={{ drawerLabel: "My Profile" }}
              component={ProfileScreenStack}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Registration"
              options={{ drawerLabel: "Register" }}
              component={RegistrationScreen}
            />
            <Drawer.Screen
              name="Login"
              options={{ drawerLabel: "Login" }}
              component={LoginScreen}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default Stacks;
