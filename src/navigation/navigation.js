import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import Home from "../screens/Home";
import Invitations from "../screens/Invitations";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Publier from "../screens/Publier";
import Messages from "../screens/Messages";
import Notifications from "../screens/Notifications";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Button, Image, Text, View, SafeAreaView } from "react-native";
import OnboardingScreen from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import Register from "../screens/Register";
import CreateStory from "../screens/home/CreateStory";

const Tab = createBottomTabNavigator();

function HomeScreenTab() {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#838383"
      inactiveColor="white"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Invitations"
        component={Invitations}
        options={{
          tabBarLabel: "Réseau",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Publier"
        component={Publier}
        options={{
          tabBarLabel: "Publier",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-square" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="comments" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { user, logout } = useContext(AuthContext);
  return (
    <SafeAreaView className="flex-1 ">
      <View className="pl-3 pt-6 pb-6 border-b border-gray-300">
        <Image
          source={{
            uri: user.profilePic || "https://picsum.photos/200/300",
          }}
          style={{ width: 70, height: 70 }}
          className="rounded-full "
        />
        <Text className="text-2xl font-bold pt-2 capitalize">{user.username}</Text>
        <Text className="text-gray-500">
          {user.email ? user.email : "Pas d'email"}
        </Text>
        <Text
          className="mt-2 text-xl"
          onPress={() => props.navigation.navigate("Publier")}
        >
          Voir le profil
        </Text>
      </View>
      <View className="flex-1 ">
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <View className="flex-1 flex-row gap-4 pl-6">
        <FontAwesome5
          name="sign-out-alt"
          color="#838383"
          size={20}
          onPress={() => props.navigation.navigate("Publier")}
        />
        <Text
          className="text-gray-500"
          onPress={() => {
            logout();
            props.navigation.navigate("Login");
          }}
        >
          Déconnexion
        </Text>
      </View>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

function HomeScreen() {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={screenOptions}
    >
      <Drawer.Screen name="Accueil" component={HomeScreenTab} />
      <Drawer.Screen name="CreateStory" component={CreateStory} />
    </Drawer.Navigator>
  );
}

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  const { user, loading } = useContext(AuthContext);
  // console.log("user:", user);

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      {/* <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      /> */}
      {user ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default RootNavigation;
