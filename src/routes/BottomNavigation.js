import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import {
  BookingNavigations,
  ProfileNavigations,
  SearchNavigations,
  HomeNavigations,
  TopTabs,
} from "./NavigationTest";

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          headerBackVisible: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 0,
            height: 50,
          },
          tabBarLabelStyle: { color: "black", textTransform: "capitalize" },
        }}
        initialRouteName="home"
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? "storefront" : "storefront-outline"}
                size={24}
                color={focused ? "#119DA4" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text className="font-semibold">Home</Text>
              ) : (
                <Text className="text-gray-500 font-semibold">Home</Text>
              ),
          }}
          name="home"
          component={HomeNavigations}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={24}
                color={focused ? "#119DA4" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text className="font-semibold">Search</Text>
              ) : (
                <Text className="text-gray-500 font-semibold">Search</Text>
              ),
          }}
          name="search"
          component={SearchNavigations}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "ios-bookmark" : "ios-bookmark-outline"}
                size={24}
                color={focused ? "#119DA4" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text className="font-semibold">Booking</Text>
              ) : (
                <Text className="text-gray-500 font-semibold">booking</Text>
              ),

            title: "Booking",
          }}
          name="booking"
          component={TopTabs}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "#119DA4" : "gray"}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text className="font-semibold">Profile</Text>
              ) : (
                <Text className="text-gray-500 font-semibold">Profile</Text>
              ),
          }}
          name="profile"
          component={ProfileNavigations}
        />
      </Tab.Navigator>
    </>
  );
};

export { BottomNavigation };
