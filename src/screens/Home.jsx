import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useState } from "react";
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
import Posts from "../components/home/Posts";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar style="auto" />
      <Header navigation={navigation} />
      <ScrollView>
        <Stories />

        <Posts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
