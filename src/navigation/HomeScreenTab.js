import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Invitations from "../screens/Invitations";
import Publier from "../screens/publier/Publier";
import Messages from "../screens/Messages";
import Notifications from "../screens/Notifications";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Tab = createBottomTabNavigator();

export function HomeScreenTab() {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#838383"
      inactiveColor="white"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Invitations"
        component={Invitations}
        options={{
          tabBarLabel: "Réseau",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Publier"
        component={Publier}
        options={{
          tabBarLabel: "Publier",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-square" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="comments" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}