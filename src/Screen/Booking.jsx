

import { View, Text,Image,ScrollView ,TouchableOpacity} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Booking = () => {
  const navigate = useNavigation();
  return (
   
         <ScrollView
          showsVerticalScrollIndicator={true}
          className="overflow-auto  h-screen pt-4 rounded-t-3xl shadow-lg bg-white"
        >
      <View className='items-center mt-4'>
        <Text className='text-secondary text-2xl'>Parking History</Text>
      </View>

     
      <View className="w-11/12  mt-4  mx-auto shadow-2xl bg-white shadow-black rounded-xl p-3"> 
        <View className="flex-row justify-between items-center mt-1  ">
           
            <Text className='text-lg'>Makuza peace p.</Text>
            <Text className='text-end mr-7'># PBf 00000</Text>
        </View>

        <View className="flex-row justify-between mt-4 ">
          <View className=" flex-row space-x-3 ml-4">
          <Image source={require("../../assets/Mp.png")} />
          <Text>Slot A02</Text>
          </View>
          <View >
            <Text className='text-end mr-7 text-secondary'>4hours</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigate.navigate("")} className="justify-center items-center mt-4 ">
          <View className="ml-4 text-secondary'">
            <Text className="text-secondary ">see Details</Text>
          </View>
        </TouchableOpacity>
    
      </View>
      <View className="w-11/12  mt-4  mx-auto shadow-2xl bg-white shadow-black rounded-xl p-3"> 
        <View className="flex-row justify-between items-center mt-1">
            <Text className='text-lg'>Rubangura</Text>
            <Text className='text-end mr-7'># PBf 00000</Text>
        </View>

        <View className="flex-row justify-between mt-4 ">
          <View className=" flex-row space-x-3 ml-4">
          <Image source={require("../../assets/Mp.png")} />
          <Text>Slot A02</Text>
          </View>
          <View >
            <Text className='text-end mr-7 text-secondary'>4hours</Text>
          </View>
        </View>

        <View className="justify-center items-center mt-4 ">
          <View className="ml-4 text-secondary'">
            <Text className="text-secondary ">see Details</Text>
          </View>
        </View>
    
      </View>
      </ScrollView>
  
  );
};

export default Booking;
