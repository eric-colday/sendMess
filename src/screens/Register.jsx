import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigation = useNavigation();

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      console.log(res);
      alert("User created successfully");
      navigation.navigate("Login");
    } catch (err) {
      console.log(err, "erreur");
      setErr("username ou password incorrect");
    }
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#00989e]">
      <View className="flex-1 justify-center items-center gap-5 ">
        <Image
          source={require("../../assets/onboarding-img1.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text className="font-bold text-center text-[40px] text-white ">
          Register
        </Text>
        <Text className="text-center">{err}</Text>
        <TextInput
          placeholder="username"
          id="username"
          value={username}
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
          className="w-[350px] h-[50px] text-[16px] p-4 bg-white rounded-xl "
        />
        <TextInput
          placeholder="email"
          id="email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          className="w-[350px] h-[50px] text-[16px] p-4 bg-white rounded-xl "
        />
        <TextInput
          placeholder="password"
          id="password"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          className="w-[350px] h-[50px] text-[16px] p-4 bg-white rounded-xl "
        />
        <Button color="white" title="Submit" onPress={handleClick} />
        <Text className="text-white">or</Text>
        <View className="flex-row flex items-center">
          <Text>Already have an account?</Text>
          <TouchableOpacity>
            <Button
              color="white"
              title="Login"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
