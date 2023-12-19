import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";
import Stories from "../components/home/Stories";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar style="auto" />
      <Header navigation={navigation} />
      <ScrollView className="px-4 mt-4">
        <Stories />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
