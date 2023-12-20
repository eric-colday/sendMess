import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Stories = () => {
  const [story, setStory] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllStory = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/stories");
        setStory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStory();
  }, []);

  return (
    <ScrollView
      className="px-4 mt-4"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        className="w-[120px] h-[200px] mr-2 border border-gray-300 rounded-lg bg-slate-200"
        onPress={() => navigation.navigate("CreateStory")}
      >
        <Image
          source={{
            uri: "https://picsum.photos/200/300",
          }}
          className="w-full h-[120px] rounded-t-lg"
        />
        <View className="relative bottom-4 left-9 border-4 border-slate-50 rounded-full w-10 h-10 flex justify-center bg-blue-600 items-center">
          <FontAwesome5 name="plus" size={20} color="#FCFCFC" />
        </View>
        <Text className="absolute bottom-4 left-4 text-center font-bold text-[16px] ">
          Créer une stroy
        </Text>
      </TouchableOpacity>
      {story.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="w-[120px] h-[200px] mr-2 border border-gray-300 rounded-lg bg-slate-200"
        >
          <Image
            source={{
              uri: item.img,
            }}
            className="w-full h-[200px] rounded-lg"
          />
          <Text className="text-[12px] font-bold text-white absolute bottom-2 left-2 ">
            Fabrice Boys
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Stories;
