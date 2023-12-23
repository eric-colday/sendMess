import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Likes from "../../components/home/Likes";
import { AuthContext } from "../../navigation/AuthContext";

const Post = ({ navigation, route }) => {
  const { post, postUser, getPosts } = route.params;
  const [updatePost, setUpdatePost] = useState(false);
  const [img, setImg] = useState(null);
  const [updateDesc, setUpdateDesc] = useState("");
  const { user } = useContext(AuthContext);

  const postId = post.id;

  const HandleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8800/api/posts/${postId}`, {
        desc: updateDesc,
        img: img,
      });
      setUpdateDesc("");
      setImg(null);
      alert("Post updated successfully");
      getPosts();
      navigation.goBack("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

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
    <SafeAreaView>
      <View className="mb-4 p-4">
        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
              <FontAwesome5 name="chevron-left" size={20} />
            </TouchableOpacity>
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
                <Text className="font-bold capitalize "> {postUser.name}</Text>
              )}
              <Text>{timeSince(new Date(post.createdAt))}</Text>
            </View>
            {/* À supprimer */}
            <Text>{post.id}</Text>
          </View>
          {post.userId === user.id ? (
            <TouchableOpacity onPress={() => setUpdatePost(!updatePost)}>
              <FontAwesome5 name="pen" size={20} />
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
        {post.userId === user.id && updatePost ? (
          <View>
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
                placeholder={post.desc}
                multiline={true}
                numberOfLines={4}
                className="text-xl"
                onChangeText={(text) => setUpdateDesc(text)}
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
            <View className="flex-row justify-around mt-6">
              <TouchableOpacity onPress={() => setUpdatePost(false)}>
                <Text className="text-red-500 font-bold">Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => HandleUpdate(postId)} 
              className="bg-blue-500 p-2 rounded-xl"
              >
                <Text className=" text-white font-bold">Mettre à jour</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setUpdatePost(true)}>
            <Text className="mt-3">{post.desc}</Text>
          </TouchableOpacity>
        )}
      </View>
      {post.img && (
        <Image
          source={{
            uri: post.img,
          }}
          className="w-full h-[300px]"
        />
      )}
      <View className="flex-row justify-around p-4 border-t border-gray-200">
        <Likes
          post={post}
          // likeId={likes?.find((like) => like.postId === post.id)?.id}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Post", { post })}>
          <View className="flex-row items-center gap-2">
            <Text>Commenter</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between p-4">
        <View className="flex-row items-center gap-2">
          <FontAwesome5 name="thumbs-up" color="#0588F0" size={20} />
          <Text>
            {/* {likes?.filter((like) => like.postId === post.id).length} */}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <FontAwesome5 name="comment" color="#0588F0" size={20} />
          <Text>12</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Post;
