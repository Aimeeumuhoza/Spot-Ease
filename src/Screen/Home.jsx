import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons, Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { GetLocation } from "../components";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const RenderParking = ({ park }) => {
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("ParkDetail", { parking: park })}
      style={{ width: (screenWidth - 50) / 2, elevation: 1 }}
      className={"m-2  bg-white rounded-lg"}
    >
      <Image
        source={{ uri: park.profilePicture }}
        className={`h-28 rounded-t-lg w-full`}
      />
      <View className="p-2">
        <Text className={`mt-2 font-bold`}>{park.buildingName}</Text>
        <View className={`flex-row justify-between items-center`}>
          <Text className={`text-sm text-gray-500`}>{park.Street}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const getParkings = async () => {
  try {
    const API_BASE_URL =
      "https://smart-parking-api-3g3e.onrender.com/parking/buildings/getAllBuildingData";
    const res = await axios.get(`${API_BASE_URL}`);
    return res.data.allBuildings;
  } catch (error) {
    console.error(error);
  }
};
export const ParkingList = () => {
  const [parking, setParking] = useState([]);
  useEffect(() => {
    const fetchParkings = async () => {
      const data = await getParkings();
      setParking(data);
    };
    fetchParkings();
  }, []);

  useEffect(() => {
    getParkings();
  }, []);
  if (!parking)
    return (
      <View className="flex-1 justify-between">
        <Text>Error connecting to the server</Text>
      </View>
    );
  return (
    <View style={{ width: "100%" }}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        data={parking.slice(0, 5)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <RenderParking park={item} />}
        horizontal
        alwaysBounceHorizontal={true}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.5)"]}
        start={{ x: 0.7, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: "absolute",
          width: "25%",
          height: "100%",
          right: 0,
        }}
      />
    </View>
  );
};

const Home = () => {
  const navigate = useNavigation();
  const [parking, setParking] = useState([]);

  useEffect(() => {
    const fetchParkings = async () => {
      const data = await getParkings();
      setParking(data);
    };
    fetchParkings();
  }, []);

  useEffect(() => {
    getParkings();
  }, []);
  return (
    <View className="bg-bg w-full h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-3 flex-row flex justify-between mx-5 ">
          <View className="flex-row">
            <EvilIcons name="location" size={24} color="black" />
            <GetLocation />
          </View>
          <View className="">
            <Ionicons
              onPress={() => navigate.navigate("notification")}
              name="notifications"
              size={24}
              color="#0F172A"
              className=""
            />
          </View>
        </View>
        <Text className="text-2xl mt-2 ml-5">Let’s find your best </Text>
        <Text className="text-2xl ml-5"> parking slot</Text>
        <View className=" flex-row items-center border  rounded-2xl  mt-3  w-11/12 mx-auto h-11 space-x-5 border-gray-400">
          <View className="mx-4">
            <Feather name="search" size={22} color="gray" className="mx-5" />
          </View>
          <TextInput placeholder="where are you going" />
        </View>
        <View className="flex-row h-[23vh] bg-secondary justify-start w-11/12 mx-auto mt-3 rounded-3xl">
          <View className="mt-6 mx-4 text-white">
            {/* <Text className="text-white">hello </Text> */}
            <Text className="text-white font-bold">
              Pre-book your parking slot
            </Text>
            <Text className="text-white mt-4">
              You can easily book your parking
            </Text>
          </View>
          <View className=" h-45 w-40 mx-auto pr-6">
            <Image
              source={require("../../assets/rafiki.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View className="flex-row my-4 justify-between mt-3 mx-5">
          <Text>Recent Bookings</Text>
          <TouchableOpacity
            onPress={() => navigate.navigate("SeeAll", { parking })}
          >
            <Text>See All</Text>
          </TouchableOpacity>
        </View>
        <ParkingList />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    // borderTopEndRadius: 5,
    // borderTopLeftRadius: 5,
  },
});
