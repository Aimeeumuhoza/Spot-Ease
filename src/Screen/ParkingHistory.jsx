import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import useAuthStore from "../hooks/UseAuthStore";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation,useFocusEffect } from "@react-navigation/native";

const ParkingHistory = () => {
  const { AuthToken, setAuthStatus } = useAuthStore();
  const [parkingData, setParkingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigation();
  // useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://smart-parking-api-3g3e.onrender.com/parking/reservations/getRecentBookingOfUser",
          {
            headers: {
              Authorization: `Bearer ${AuthToken}`,
            },
          }
        );
        setParkingData(response.data);
      } catch (error) {
        console.log(error?.response?.data?.message);
        if (error.response.data.message === "jwt expired") {
          deleteItemAsync("Authtoken");
          deleteItemAsync("UserData");
          setAuthStatus(false);
        }
      }
      setIsLoading(false);
    };

  //   fetchData();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"#119DA4"} size={24} />
      </View>
    );
    if(parkingData.length === 0 )
    return(
      <View className="flex-1 items-center justify-center">
      <Text>You do not have any reservation </Text>
    </View>
      )
  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      className="overflow-auto  h-screen pt-4 rounded-t-3xl shadow-lg bg-white"
    >
      <View className="items-center mt-4">
        <Text className="text-secondary text-2xl">Parking History</Text>
      </View>
      {parkingData.map(item => (
        <View key={item._id} className="w-11/12  mt-4  mx-auto shadow-2xl bg-white shadow-black rounded-xl p-3">
          <View className="flex-row justify-between items-center mt-1  ">
            <Text className="text-lg">Makuza peace p.</Text>
            <Text className="text-end mr-7">carPlateNo: {item.carPlateNo}</Text>
          </View>

          <View className="flex-row justify-between mt-4 ">
            <View className=" flex-row space-x-3 ml-4">
              <Image source={require("../../assets/Mp.png")} />
              <Text>SlotName: {item.slotName}</Text>
            </View>
            <View>
              <Text className="text-end mr-7 text-secondary">
                {item.bookedDate}
              </Text>
              <View className="mt-4">
                <Text>{item.Status}</Text>
                <AntDesign
                  name="checkcircleo"
                  size={17}
                  color={
                    item.Status === "pending"
                      ? "#29859A"
                      : item.Status === "approaved"
                      ? "orange"
                      : "red"
                  }
                />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigate.navigate('Details',{parkingData:item})} className="justify-center items-center mt-4 ">
          <View className="ml-4 text-secondary'">
            <Text className="text-secondary ">see Details</Text>
          </View>
        </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ParkingHistory;

