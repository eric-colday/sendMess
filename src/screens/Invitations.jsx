import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { Image } from "react-native";

const Invitations = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <Header navigation={navigation} />
      <ScrollView>
        <View className="p-1 bg-gray-300"></View>
        <View className="mx-4">
          <View>
            <Text className="text-base py-2">
              Personnes que vous pourriez peut-être connaître
            </Text>
          </View>
          <View className="flex flex-row flex-wrap justify-between gap-4">
            <View className="border border-gray-300 w-48 h-64 rounded-lg ">
              <View className="flex-1 justify-center items-center gap-5">
                <Image
                  className="w-24 h-24 rounded-full"
                  source={{
                    uri: "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png",
                  }}
                />
                <Text className="font-semibold">Carlos Brown</Text>
                <TouchableOpacity className="w-40 h-8 border rounded-full justify-center items-center ">
                  <Text className="font-semibold">S'abonner</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="border border-gray-300 w-48 h-64 rounded-lg ">
              <View className="flex-1 justify-center items-center gap-5">
                <Image
                  className="w-24 h-24 rounded-full"
                  source={{
                    uri: "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png",
                  }}
                />
                <Text className="font-semibold">Carlos Brown</Text>
                <TouchableOpacity className="w-40 h-8 border rounded-full justify-center items-center ">
                  <Text className="font-semibold">S'abonner</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="border border-gray-300 w-48 h-64 rounded-lg ">
              <View className="flex-1 justify-center items-center gap-5">
                <Image
                  className="w-24 h-24 rounded-full"
                  source={{
                    uri: "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png",
                  }}
                />
                <Text className="font-semibold">Carlos Brown</Text>
                <TouchableOpacity className="w-40 h-8 border rounded-full justify-center items-center ">
                  <Text className="font-semibold">S'abonner</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="border border-gray-300 w-48 h-64 rounded-lg ">
              <View className="flex-1 justify-center items-center gap-5">
                <Image
                  className="w-24 h-24 rounded-full"
                  source={{
                    uri: "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png",
                  }}
                />
                <Text className="font-semibold">Carlos Brown</Text>
                <TouchableOpacity className="w-40 h-8 border rounded-full justify-center items-center ">
                  <Text className="font-semibold">S'abonner</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Invitations;
