import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../navigation/AuthContext";
import axios from "axios";
import * as Updates from "expo-updates";

const CreateStory = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [img, setImg] = useState(null);
  const [newPost, setNewPost] = useState("");

  const handleClick = async () => {
    if (!newPost) return alert("Veuillez saisir un texte");
    try {
      await axios.post("http://localhost:8800/api/stories", {
        userId: user.id,
        desc: newPost,
        img: img,
      });
      setNewPost("");
      setImg(null);
      alert("story created successfully");
      navigation.goBack();
      // Ajoutez cette ligne pour forcer un rechargement de l'application
      await Updates.reloadAsync();
    } catch (err) {
      console.log(err, "erreur");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      {/* Header */}
      <View className="flex-row justify-between items-center px-8 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="times" size={20} />
        </TouchableOpacity>
        <Text className="capitalize font-bold">Créer une story</Text>
        <TouchableOpacity onPress={() => handleClick()}>
          <FontAwesome5 name="paper-plane" size={20} />
        </TouchableOpacity>
      </View>
      <View className="p-6">
        <View className="flex-row items-center">
          <Image
            source={{
              uri: user.profilePic || "https://picsum.photos/200/300",
            }}
            className="rounded-full w-12 h-12"
          />
          <Text className="ml-4 font-bold capitalize">
            {user.name ? user.name : user.username}
          </Text>
        </View>
        <View className="mt-4">
          <TextInput
            autoCapitalize="none"
            placeholder="Ajouter uniquement le lien d'une image"
            onChangeText={(text) => setImg(text)}
            className="w-[350px] h-[50px] text-[16px] p-4 bg-white rounded-xl "
          />
        </View>
        <View className="mt-4">
          <TextInput
            placeholder="Que voulez-vous dire ?"
            multiline={true}
            numberOfLines={4}
            className="text-xl"
            onChangeText={(text) => setNewPost(text)}
          />
        </View>
        <View className="mt-6">
          {img && (
            <Image
              source={{
                uri: img,
              }}
              className="w-full h-[300px]"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateStory;
