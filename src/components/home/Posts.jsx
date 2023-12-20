import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/posts");
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);

        // Obtenez les likes
        const likesRes = await axios.get("http://localhost:8800/api/likes");
        setLikes(likesRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const HandleLike = async (postId, userId, isLiked) => {};

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "mo";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "j";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "min";
    }
    return "à l'instant";
  }

  return (
    <View className="mt-4 border-y border-gray-200 ">
      {posts.map((item) => {
        // Trouver l'utilisateur qui a posté
        const postUser = users.find((user) => user.id === item.userId);

        return (
          <View
            key={item.id}
            className="bg-white rounded-lg shadow-lg border border-gray-300"
          >
            <View className="p-1 bg-gray-300"></View>
            <View className="mb-4 p-4">
              <View className="flex-row justify-between">
                <View className="flex-row gap-4">
                  {postUser && (
                    <Image
                      source={{
                        uri:
                          postUser.profilePic ||
                          "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png",
                      }}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <View>
                    {postUser && (
                      <Text className="font-bold capitalize ">
                        {postUser.name}
                      </Text>
                    )}
                    <Text>{timeSince(new Date(item.createdAt))}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <FontAwesome5 name="trash" color="#E5484D" size={20} />
                </TouchableOpacity>
              </View>
              <Text className="mt-3">{item.desc}</Text>
            </View>
            {item.img && (
              <Image
                source={{
                  uri: item.img,
                }}
                className="w-full h-[300px]"
              />
            )}
            <View className="flex-row justify-between p-4">
              <View className="flex-row items-center gap-2">
                <FontAwesome5 name="thumbs-up" color="#0588F0" size={20} />
                <Text>12</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <FontAwesome5 name="comment" color="#0588F0" size={20} />
                <Text>12</Text>
              </View>
            </View>
            <View className="flex-row justify-around p-4 border-t border-gray-200">
              <TouchableOpacity onPress={() => HandleLike()}>
                <View className="flex-row items-center gap-2">
                  <FontAwesome5 name="thumbs-up" color="#0588F0" size={20} />
                  <Text>J'aime</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View className="flex-row items-center gap-2">
                  <FontAwesome5 name="comment" color="#0588F0" size={20} />
                  <Text>Commenter</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Posts;
