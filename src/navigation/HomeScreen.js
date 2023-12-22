import { HomeScreenTab } from "./HomeScreenTab";
import CreateStory from "../screens/home/CreateStory";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import {
  Button,
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

function CustomDrawerContent(props) {
  const { user, logout } = useContext(AuthContext);
  return (
    <SafeAreaView className="flex-1 ">
      <View className="pl-3 pt-6 pb-6 border-b border-gray-300">
        <Image
          source={{
            uri: user.profilePic || "https://picsum.photos/200/300",
          }}
          style={{ width: 70, height: 70 }}
          className="rounded-full "
        />
        <Text className="text-2xl font-bold pt-2 capitalize">
          {user.username}
        </Text>
        <Text className="text-gray-500">
          {user.email ? user.email : "Pas d'email"}
        </Text>
        <Text
          className="mt-2 text-xl"
          onPress={() => props.navigation.navigate("Profil", { user })}
        >
          Voir le profil
        </Text>
      </View>
      <View className="flex-1 ">
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
      <TouchableOpacity
        className="flex-1 flex-row gap-4 pl-6"
        onPress={() => {
          logout();
          props.navigation.navigate("HomeScreen");
        }}
      >
        <FontAwesome5 name="sign-out-alt" color="#838383" size={20} />
        <Text className="text-gray-500">Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

export function HomeScreen() {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={screenOptions}
    >
      <Drawer.Screen name="Accueil" component={HomeScreenTab} />
    </Drawer.Navigator>
  );
}
