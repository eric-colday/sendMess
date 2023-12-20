import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import OnboardingScreen from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import Register from "../screens/Register";
import { HomeScreen } from "./HomeScreen";



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
