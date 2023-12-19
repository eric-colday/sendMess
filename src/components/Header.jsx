import React, { useContext } from "react";
import { Button, TouchableOpacity } from "react-native";
import { Image, Text, TextInput, View } from "react-native";
import { AuthContext } from "../navigation/AuthContext";

const Header = ({ navigation }) => {
  const { user, loading } = useContext(AuthContext);

  return (
    <View className="flex-row border-b border-gray-200 py-3 px-8 gap-4 ">
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: user.profilePic || "https://picsum.photos/200/300",
          }}
          className="rounded-full"
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Recherche..."
        className="border border-gray-300 rounded-lg px-4 w-56 "
      />
    </View>
  );
};

export default Header;
