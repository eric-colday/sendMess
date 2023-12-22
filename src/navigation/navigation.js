import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import OnboardingScreen from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import Register from "../screens/Register";
import { HomeScreen } from "./HomeScreen";
import Post from "../screens/postDetails/Post";
import CreateStory from "../screens/home/CreateStory";
import Profil from "../screens/profil/Profil";

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
    routeName = "OnboardingScreen";
  } else {
    routeName = "Login";
  }

  return (
    <>
      {user ? (
        <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profil"
            component={Profil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateStory"
            component={CreateStory}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default RootNavigation;
