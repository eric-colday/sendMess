import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

const Comments = ({ post, user }) => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  // FILTRE DES COMMENTAIRES
  const postComments = comments.filter((comment) => comment.postId === post.id);

  // COMMENTS
  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/comments");
      setComments(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // USERS
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/users");
      setUsers(res.data);
      // console.log(res.data);
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
    <View>
      <View className="px-4 py-5 mb-40">
        {postComments.map((comment) => {
          // TROUVER L'UTILISATEUR QUI A COMMENTÉ
          const commentUser = users.find((user) => user.id === comment.userId);

          return (
            <View className="flex-row gap-4 mb-4" key={comment.id}>
              <Image
                source={{
                  uri:
                    commentUser?.profilePic || "https://picsum.photos/200/300",
                }}
                className="w-12 h-12 rounded-full"
              />
              <View className="flex-col">
                <View className="px-3 py-2 w-80 bg-gray-200 rounded-2xl">
                  <Text className="font-bold capitalize">
                    {commentUser?.name
                      ? commentUser?.name
                      : commentUser?.username}
                  </Text>
                  <Text className="mt-1">{comment.desc}</Text>
                </View>
                <Text className="mt-2 ml-3">
                  {timeSince(new Date(comment.createdAt))}.
                </Text>
                <View className="flex items-end">
                  {comment.img && (
                    <Image
                      source={{
                        uri: comment.img,
                      }}
                      className="w-40 h-40 rounded-2xl "
                    />
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Comments;
