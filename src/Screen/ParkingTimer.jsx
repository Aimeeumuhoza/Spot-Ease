import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { SliderComponent, Timer } from "../components";
import { CustomBottomSheet } from "../components/BottomModal";
import { useRef } from "react";
const ParkingTimer = () => {
  const bottomSheetRef = useRef(null);
  return (
    <View className="w-11/12 mb-2 relative flex-1 mx-auto">
      <View className="my-1 flex-row items-center gap-x-2">
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text className="text-xl">Parking Timer</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Timer />
        <View
          className=" my-4 px-2 space-y-2 rounded-md py-4"
          style={{ elevation: 3 }}
        >
          <View className="justify-between flex-row items-center">
            <Text className="text-bold text-gray-500">Perking Area</Text>
            <Text>Makuza plaza</Text>
          </View>
          <View className="justify-between flex-row items-center">
            <Text className="text-bold capitalize text-gray-500">Adrress</Text>
            <Text>Nyarugenge kN 65</Text>
          </View>
          <View className="justify-between flex-row items-center">
            <Text className="text-bold capitalize text-gray-500">Vehicle</Text>
            <Text>Toyota supra</Text>
          </View>
          <View className="justify-between flex-row items-center">
            <Text className="text-bold capitalize text-gray-500">
              plate number
            </Text>
            <Text>RAF 546 T</Text>
          </View>
          <View className="justify-between flex-row items-center">
            <Text className="text-bold capitalize text-gray-500">
              Parking slot
            </Text>
            <Text>A-093</Text>
          </View>
          <View className="justify-between flex-row items-center">
            <Text className="text-bold capitalize text-gray-500">Date</Text>
            <Text>NOV,12/2023</Text>
          </View>
          <View className="justify-between flex-row items-center">
            <Text className="text-bold capitalize text-gray-500">Duration</Text>
            <Text>4 hours</Text>
          </View>
          <View className="justify-between flex-row items-center">
            <Text className="text-bold capitalize text-gray-500">Hours</Text>
            <Text>08:00 AM - 9:30 PM</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.snapToIndex(1)}
          className="w-full p-2 rounded-md bg-primary rouynd"
        >
          <Text className="text-white capitalize text-xl text-center">
            Extend Parking Time
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomBottomSheet bottomRef={bottomSheetRef}>
        <Text className="text-2xl text-primary text-center my-2">
          Extending Parking Time
        </Text>

        <View className="w-11/12 flex-col mx-auto  my-4">
          <SliderComponent />
          <View>
            <Text>Total</Text>
            <View className="items-center gap-x-4 flex-row">
              <Text className="text-primary text-2xl">RWF 2000</Text>
              <Text>$2 /hour</Text>
            </View>
          </View>
        </View>

        <View className="flex-row w-11/12 mx-auto justify-between items-center">
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.close()}
            className="border border-primary my-1 p-2 px-4 rounded-md"
          >
            <Text className="text-center  font-medium my-2 capitalize text-primary">
              cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-primary my-1 p-2  px-4 rounded-md">
            <Text className="text-center font-medium my-2 capitalize text-white">
              Entend
            </Text>
          </TouchableOpacity>
        </View>
      </CustomBottomSheet>
    </View>
  );
};

export default ParkingTimer;
