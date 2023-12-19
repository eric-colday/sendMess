import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native';

const BootomTabs = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-around m-5 absolute bottom-0  border-t border-gray-300 w-full   " >
       <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon icon="home" text="Accueil" />
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => navigation.navigate("Invitations")}>
        <Icon icon="users" text="Réseau" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon icon="plus-square" text="Publier" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon icon="comments" text="Messages" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon icon="bell" text="Notifications" />
      </TouchableOpacity>
    </View>
  );
};

export default BootomTabs;

const Icon = (props) => (
  <View className="flex justify-center items-center py-3  ">
    <FontAwesome5
      name={props.icon}
      size={25}
      color="#838383"
    />
    <Text className="text-[#838383]">{props.text}</Text>
  </View>
);
