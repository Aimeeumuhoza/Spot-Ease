import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
import { CustomBottomSheet } from "../components/BottomModal";
import { useNavigation } from "@react-navigation/native";
import { deleteItemAsync } from "expo-secure-store";
import axios from "axios";
import useAuthStore from "../hooks/UseAuthStore";
import useSWR from "swr";

const SelectVichicle = ({ route }) => {
  const { AuthToken } = useAuthStore();
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const [isloading, SetLaoding] = useState(false);
  const [selected, SetSelected] = useState(null);
  const [carModel, setCarModel] = useState();
  const [platNumber, setPlatNumber] = useState();
  console.log(selected);
  const parkData = {
    PricePerHour: route.params.PricePerHour,
    slotId: route.params.selectedSlot,
    vehicleId: selected,
  };

  const {
    data: cars,
    mutate: mutateCars,
    isLoading,
  } = useSWR(
    "https://smart-parking-api-3g3e.onrender.com/parking/cars/getYourCars",
    async (url) => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${AuthToken}` },
        });
        return response.data;
      } catch (error) {
        //alert(error.response.data.message);
        if (error.response.status === 401) {
          deleteItemAsync("Authtoken");
          deleteItemAsync("UserData");
          setAuthStatus(false);
        }
        console.log(error.response.status);
        if (error.response.status === 503) {
          alert("Server is down");
        }
      }
    }
  );
  // console.log(cars);
  const addCar = async () => {
    SetLaoding(true);
    try {
      const response = await axios.post(
        "https://smart-parking-api-3g3e.onrender.com/parking/cars/addNewCar",
        {
          carModel,
          platNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
        }
      );
      console.log(response.data.status);
      alert(response.data.status);
      mutateCars();
      SetLaoding(false);
    } catch (error) {
      alert(error.response.data.message);
      console.error(error.response.data.message);
    }
  };
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <View className="w-11/12 relative flex-1 mx-auto">
      <View className="my-1 flex-row items-center gap-x-2">
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={24}
          color="black"
        />
        <Text className="text-xl">SelectVichicle</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 h-screen relative"
      >
        {cars &&
          cars.map((car) => (
            <TouchableOpacity
              onPress={() => SetSelected(car._id)}
              key={car._id}
              className={`${
                selected === car._id
                  ? "border-primary rounded-xl"
                  : "border-gray-400 rounded-xl"
              } my-2 border-2 justify-evenly  items-center space-x-4 flex-row  py-4 rounded-xl`}
            >
              <View className="w-min">
                <Image source={require("../../assets/Car1.png")} />
              </View>
              <View className="gap-y-2">
                <Text className="text-3xl capitalize">{car.carModel}</Text>
                <Text>{car.platNumber}</Text>
              </View>
              <View
                className="border-2 p-1  h-6 w-6 justify-center items-center"
                style={{ borderColor: "#119DA4", borderRadius: 100 }}
              >
                <View
                  className={`${
                    selected === car._id ? "bg-primary rounded-[100px]" : ""
                  }  p-1  h-4 w-4 justify-center items-center`}
                  style={{ borderRadius: 100 }}
                ></View>
              </View>
            </TouchableOpacity>
          ))}

        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.snapToIndex(1)}
          className="my-2 border-[2px] mb-20 border-primary rounded-md py-2 justify-center items-center"
        >
          <Text className="text-primary capitalize text-xl">
            Add New vehicle
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View className="my-2 absolute bottom-2 w-full bg-primary rounded-md py-2 justify-center items-center">
        <TouchableOpacity
          disabled={!selected}
          onPress={() => navigation.navigate("parkbooking", { parkData })}
        >
          <Text className="text-white bg-primary capitalize text-xl">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <CustomBottomSheet bottomRef={bottomSheetRef}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 10}
          style={{ flex: 1 }}
        >
          <View className="my-4 space-y-2 w-11/12 mx-auto">
            <Text className="text-center text-xl">Add Vehicle</Text>

            <View className="flex-col space-y-2">
              <Text className="text-black">Car Name</Text>
              <TextInput
                className="border border-gray-400 rounded-md p-1"
                placeholder="Enter Vehicle Name"
                onChangeText={(carModel) => setCarModel(carModel)}
              />
            </View>
            <View className="flex-col space-y-2">
              <Text className="text-black">Car plate number</Text>
              <TextInput
                className="border border-gray-400 rounded-md p-1"
                placeholder="Enter Vehicle plate number"
                onChangeText={(platNumber) => setPlatNumber(platNumber)}
              />
            </View>
            <TouchableOpacity
            className="bg-primary p-2 rounded-md"
            onPress={addCar}
          >
            {isloading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text className="text-white text-center bg-primary capitalize text-xl">
                Add Vehicle
              </Text>
            )}
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </CustomBottomSheet>
    </View>
  );
};

export default SelectVichicle;
