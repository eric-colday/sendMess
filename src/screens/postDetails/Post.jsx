import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Likes from "../../components/home/Likes";
import { AuthContext } from "../../navigation/AuthContext";
import Comments from "../../components/Posts/Comments";
import { postsStore } from "../../../store";
import * as Updates from 'expo-updates';

const Post = ({ navigation, route }) => {
  const { post, postUser } = route.params;
  const [updatePost, setUpdatePost] = useState(false);
  const [img, setImg] = useState(null);
  const [updateDesc, setUpdateDesc] = useState("");
  const { user } = useContext(AuthContext);
  const { getPosts} = postsStore(state => state);

  const [imgComment, setImgComment] = useState(null);
  const [newComment, setNewComment] = useState("");

  const postId = post.id;

  const HandleUpdate = async () => {
    
    try {
      await axios.put(`http://localhost:8800/api/posts/${postId}`, {
        desc: updateDesc || post.desc,
        img: img || post.img,
      });
      setUpdateDesc("");
      setImg(null);
      alert("Post updated successfully");
      getPosts();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    if (!newComment) return alert("Veuillez saisir un texte");
    try {
      await axios.post("http://localhost:8800/api/comments", {
        userId: user.id,
        postId: postId,
        desc: newComment,
        img: imgComment,
      });
      setNewComment("");
      setImgComment(null);
      alert("Comment created successfully");
      await Updates.reloadAsync();
    } catch (err) {
      console.log(err);
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
        {/* HEADER */}
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
      </View>
      {/* POST */}
      <ScrollView className="mb-10">
        {post.userId === user.id && updatePost ? (
          <View className="p-4">
            <View>
              <TextInput
                autoCapitalize="none"
                defaultValue={post.img}
                placeholder="Ajouter uniquement le lien d'une image"
                onChangeText={(text) => setImg(text)}
                className="w-[350px] h-[50px] text-[16px] p-4 bg-white rounded-xl "
              />
            </View>
            <View className="mt-4">
              <TextInput
                placeholder={post.desc}
                defaultValue={post.desc}
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
              <TouchableOpacity
                onPress={() => HandleUpdate(postId)}
                className="bg-blue-500 p-2 rounded-xl"
              >
                <Text className=" text-white font-bold">Mettre à jour</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setUpdatePost(true)}>
            <Text className="mt-3 p-4">{post.desc}</Text>
          </TouchableOpacity>
        )}
        {post.img && (
          <Image
            source={{
              uri: post.img,
            }}
            className="w-full h-[300px]"
          />
        )}
        {/* LIKES ET COMMENTAIRES */}
        <View className="flex-row justify-around p-4 ">
          <Likes
            post={post}
            // likeId={likes?.find((like) => like.postId === post.id)?.id}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Post", { post })}
          >
            <View className="flex-row items-center gap-2 ">
              <Text>Commenter</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between p-4 border-t border-gray-200">
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
        <Comments post={post} />
      </ScrollView>
      {/* ADD COMMENT */}
      <View className="absolute top-[765px] bg-white w-full h-40 py-5 px-4">
        <View className="flex-row  gap-4 px-4 py-2 ">
          <Image
            source={{
              uri:
                user.profilePic ||
                "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png",
            }}
            className="w-10 h-10 rounded-full"
          />
          <View className="flex-col">
            {user && (
              <View className="flex-row items-center gap-3">
                <View>
                  <TextInput
                    placeholder="Ajouter un commentaire"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setNewComment(text)}
                    className="text-xl mt-1 p-3 rounded-xl w-[250px] h-[50px] bg-gray-100"
                  />
                  <TextInput
                    placeholder="Uniquement le lien d'une image"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setImgComment(text)}
                    className="mt-1 p-3 rounded-xl w-[250px] h-[50px] bg-gray-100"
                  />
                </View>
                <TouchableOpacity onPress={() => handleClick()}>
                  <FontAwesome5 name="paper-plane" size={30} color="#0588F0" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Post;
