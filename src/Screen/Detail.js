import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Details = ({route}) => {
  const { parkingData } = route.params;
  console.log("data",parkingData)
  return (
    <SafeAreaView>
      <View className="w-10/12  mx-auto shadow-2xl bg-white shadow-black rounded-xl">
        <Text className="text-secondary mt-5 mx-5">Order Detail</Text>

        <View className="flex-row justify-between mt-4 ">
          <View className="ml-12">
            <Text>Makuza</Text>
          </View>
          <View >
            <Text className='text-end mr-7'>slot A1</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-8 ">
          <View className="ml-4">
            <Text>Invoice number</Text>
          </View>
          <View >
            <Text className='text-end mr-7 text-secondary'>#  12478999</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-8 ">
          <View className="ml-4">
            <Text>Date & Time</Text>
          </View>
          <View >
            <Text className='text-end mr-7 text-secondary' >{parkingData.bookedDate}</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-8 ">
          <View className="ml-4">
            <Text>Duration</Text>
          </View>
          <View >
            <Text className='text-end mr-7 text-secondary'>{parkingData.Duration}</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-8 ">
          <View className="ml-4">
            <Text>Vehicle</Text>
          </View>
          <View >
            <Text className='text-end mr-7 text-secondary'>Ford  (AR 343)</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-11 ">
          <View className="ml-4 ">
            <Text className="text-2xl">Total</Text>
          </View>
          <View >
            <Text className='text-end mr-7 text-secondary text-2xl'>{parkingData.totalPrice} RW</Text>
          </View>
        </View>

      </View>

      <View className="w-10/12 h-20 mt-4  mx-auto  shadow-2xl bg-white shadow-black rounded-xl">
        <View className='mt-2 mx-4 items-center '>
        <Text className="text-secondary">Payment Method</Text>
        <Text className="mt-3">Mobile  money</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;
