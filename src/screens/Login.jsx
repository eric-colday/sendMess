import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../navigation/AuthContext";
import axios from "axios";
import LottieView from "lottie-react-native";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [err, setErr] = useState("");

  const { login } = useContext(AuthContext);

  // const HandleLogin = async () => {
  //   try {
  //     if (username !== null && password !== null) {
  //       const res = await axios.post("http://localhost:8800/api/auth/login", {
  //         username,
  //         password,
  //       });
  //       login(res.data);
  //       // console.log(res.data);
  //       navigation.navigate("HomeScreen");
  //     } else {
  //       setErr("Veuillez remplir tous les champs");
  //     }
  //   } catch (err) {
  //     console.log(err, "erreur");
  //     setErr("username ou password incorrect");
  //   }
  // };

  const HandleLogin = async () => {
    try {
      if (username !== null && password !== null) {
        login(username, password);
        navigation.navigate("HomeScreen");
      } else {
        setErr("Veuillez remplir tous les champs");
      }
    } catch (err) {
      console.log(err, "erreur");
      setErr("username ou password incorrect");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#00989e]">
      <View className="flex-1 justify-center items-center gap-5 ">
        <LottieView
          source={require("../../assets/animation_lo8bey8e.json")}
          autoPlay loop
        />
        <Text className="font-bold text-center text-[40px] text-white ">
          Login
        </Text>
        <Text className="text-center">{err}</Text>
        <TextInput
          className="w-[350px] h-[50px] text-[16px] p-4 bg-white rounded-xl "
          placeholder="username"
          id="username"
          value={username}
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          className="w-[350px] h-[50px] text-[16px] p-4 bg-white rounded-xl  "
          placeholder="password"
          id="password"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity className="">
          <Button
            color="white"
            title="Se connecter"
            onPress={() => HandleLogin()}
          />
        </TouchableOpacity>
        <Text className="text-white">or</Text>
        <View className="flex-row flex items-center">
          <Text>Already have an account ?</Text>
          <TouchableOpacity>
            <Button
              title="Register"
              onPress={() => {
                navigation.navigate("Register");
              }}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
