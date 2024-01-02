import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
import { usersStore } from "../../store";
import { AuthContext } from "../navigation/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Invitations = ({ navigation }) => {
  const { users, getUsers } = usersStore();
  const { user } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);

  const [test, setTest] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  // Filtrer l'utilisateur connecté de la liste des utilisateurs
  const followings = users.filter((u) => u.id !== user.id);

  const handleClick = async (following) => {
    // console.log(following);
    const followedUserId = following;
    try {
      const res = await axios.post("http://localhost:8800/api/relationships", {
        followedUserId,
      });
      console.log(res.data);
      await AsyncStorage.setItem("subscriptions", JSON.stringify(res.data));
      setSubscriptions({
        ...subscriptions,
        [followedUserId]: res.data === "following",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSubscriptions = async () => {
    try {
      const userId = user.id;
      const res = await AsyncStorage.getItem("subscriptions");
      const allSubscriptions = JSON.parse(res);

      const userSubscriptions = allSubscriptions.filter(
        (sub) => sub.userId === userId
      );
      setSubscriptions(userSubscriptions);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getSubscriptions();
  }, []);

  const relationships = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/relationships");
      setTest(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    relationships();
  }
  , []);

  
 



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
          <View className="flex flex-row flex-wrap justify-between ">
            {followings.map((following, index) => {
              return (
                <View
                  className="border border-gray-300 w-48 h-64 rounded-lg mb-3 "
                  key={index}
                >
                  <View className="flex-1 justify-center items-center gap-5">
                    <Image
                      className="w-24 h-24 rounded-full"
                      source={{
                        uri:
                          following.profilePic ||
                          "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png",
                      }}
                    />
                    <Text className="font-semibold capitalize">{following.name ? following.name : following.username}</Text>
                    <TouchableOpacity onPress={() => handleClick(following.id)}>
                      {subscriptions[following.id] ? (
                        <View className="w-40 h-8 border-2 border-blue-700  rounded-full justify-center items-center ">
                          <Text className="font-semibold text-blue-700">
                            Abonné(e)
                          </Text>
                        </View>
                      ) : (
                        <View className="w-40 h-8 border rounded-full justify-center items-center ">
                          <Text className="font-semibold">S'abonner</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Invitations;
