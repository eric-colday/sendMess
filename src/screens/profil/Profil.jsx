import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Likes from "../../components/home/Likes";

const Profil = ({ navigation, route }) => {
  const [following, setFollowing] = useState({});
  const [followers, setFollowers] = useState({});
  const [posts, setPosts] = useState([{}]);
  const { user } = route.params;
  //   console.log(user.id);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/relationships?followedUserId=${user.id}`
        );
        const filteredData = res.data.filter(
          (relationship) => relationship.followerUserId === user.id
        );
        setFollowing(filteredData);
        // console.log(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowing();
  }, []);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/relationships?followerUserId=${user.id}`
        );
        const filteredData = res.data.filter(
          (relationship) => relationship.followedUserId === user.id
        );
        setFollowers(filteredData);
        // console.log(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowers();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/posts");
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const filteredData = sortedPosts.filter(
          (post) => post.userId === user.id
        );
        setPosts(filteredData);
        // console.log(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

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
      <View className="flex-row justify-between items-center px-8 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <Text className="capitalize font-bold">
          {user.name ? user.name : user.username}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <FontAwesome5 name="pen" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image
          source={{
            uri: user.coverPic || "https://picsum.photos/200/300",
          }}
          className="w-full h-60"
        />
        <View className="rounded-full w-56 h-56 border-4 border-white -mt-40 ml-24">
          <Image
            source={{
              uri: user.profilePic || "https://picsum.photos/200/300",
            }}
            className="w-full h-full rounded-full"
          />
        </View>
        <View className="flex gap-1 px-8 py-4 border-b border-gray-200">
          <Text className="font-bold text-3xl capitalize mb-3">
            {user.name ? user.name : user.username}
          </Text>
          <View className="mb-4">
            <Text className="font-bold">
              {following ? following.length : 0} abonné(e)s
            </Text>
            <Text className="font-bold">
              {followers ? followers.length : 0} abonnements
            </Text>
          </View>
          <Text className="text-gray-800">Email : {user.email}</Text>
          <Text className="text-gray-800">Ville : {user.city}</Text>
          <Text className="text-gray-800">Bio : {user.bio}</Text>
        </View>
        <View>
          {posts.map((post) => {
            const postUser = user;
            return (
              <View key={post.id} className="bg-white rounded-lg shadow-lg ">
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
                        <Text>{timeSince(new Date(post.createdAt))}</Text>
                      </View>
                    </View>
                  </View>
                  <Text className="mt-3">{post.desc}</Text>
                </View>
                {post.img && (
                  <Image
                    source={{
                      uri: post.img,
                    }}
                    className="w-full h-[300px]"
                  />
                )}
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
                <View className="flex-row justify-around p-4 border-t border-gray-200">
                  <Likes
                    post={post}
                    // likeId={likes?.find((like) => like.postId === post.id)?.id}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Post", { post, postUser })
                    }
                  >
                    <View className="flex-row items-center gap-2">
                      <FontAwesome5 name="comment" color="#0588F0" size={20} />
                      <Text>Commenter</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          <View className="mb-10"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profil;
