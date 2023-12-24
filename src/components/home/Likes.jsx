import axios from "axios";
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Likes = ({ post, likeId, getLikes }) => {
  const [isLike, setIsLike] = useState(false);


  const HandleLike = async () => {
    try {
      await axios.post("http://localhost:8800/api/likes", {
        postId: post.id,
      });
      setIsLike(true);
      getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDislike = async (likeId) => {
    try {
      await axios.delete("http://localhost:8800/api/likes/" + likeId );
      setIsLike(false);
      getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-row items-center gap-2">
      {isLike ? (
        <TouchableOpacity onPress={() => HandleDislike(likeId)}>
          <Text className="text-blue-500">Je n'aime plus</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => HandleLike()}>
          <Text>J'aime</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Likes;
