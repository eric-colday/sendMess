import { StatusBar } from "expo-status-bar";
import React from "react";
import RootNavigation from "./src/navigation/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/navigation/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
