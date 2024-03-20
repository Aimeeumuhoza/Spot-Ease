import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Park = ({ floor, PricePerHour }) => {
  const navigation = useNavigation();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [price, pricePer] = useState(null);
  if (!floor || !floor.length)
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-3xl">No Slots found</Text>
      </SafeAreaView>
    );
  function onSelectedSlot(id, price) {
    console.log("onSelectedSlot -> id", id);
    console.log("onSelectedSlot -> price", price);
    setSelectedSlot(id);
    pricePer(price);
  }
  return (
    <View className="flex-1 justify-between    items-center mt-2">
      <View
        className=" gap-x-5 items-center   border border-gray-400 justify-center"
        style={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {floor.map((item) => (
          <TouchableOpacity
            disabled={item.status}
            className={"border-t border-gray-500 border-b relative"}
            key={item._id}
            onPress={() => onSelectedSlot(item._id, item.Price)}
            style={
              selectedSlot === item._id
                ? {
                    backgroundColor: "#119DA4",
                    marginTop: 0.5,
                    width: "40%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "1%",
                  }
                : {
                    marginTop: 0.5,
                    width: "40%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "1%",
                  }
            }
          >
            {item.status ? (
              <View className="w-full items-center">
                <Image
                  className="h-16"
                  style={{ resizeMode: "contain" }}
                  source={require("../../assets/car.png")}
                />
                {/* <Text className="text-[10px] font-bold capitalize tracking-widest absolute p-0.5 bg-bg text-primary  right-0">
                  12:00pm - 3:00pm
                </Text> */}
              </View>
            ) : (
              <View className="w-1/2 p-2 bg-slate-300 justify-center items-center rounded-md my-4">
                <Text className="text-primary font-bold tracking-widest">
                  {item.Slot}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View className="my-4 w-11/12 mx-auto">
        <TouchableOpacity
          disabled={!selectedSlot}
          onPress={() =>
            navigation.navigate("vehicle", {
              selectedSlot,
              PricePerHour: price,
            })
          }
          className="p-2  rounded-md  bg-primary"
        >
          <Text className="text-white text-lg text-center font-bold">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Slots = ({ route }) => {
  const { PricePerHour, ParkingId } = route.params;
  // console.log("PricePerHour",PricePerHour)
  const { data, error, isLoading } = useSWR(
    `https://smart-parking-api-3g3e.onrender.com/parking/slots/checkSlotsByUser/${ParkingId}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );
  const [selectedFloor, setSelectedFloor] = useState(null);
  useEffect(() => {
    if (data && data.floors && data.floors.length > 0) {
      setSelectedFloor(data.floors[0]._id);
    }
  }, [data]);
  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"#08c25e"} size={24} />
      </View>
    );
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>
          Error: {error?.response?.data?.message || "error to the server"}
        </Text>
      </View>
    );
  if (!data.floors)
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>No Floors found</Text>
      </SafeAreaView>
    );

  const handleFloorSelection = (floor) => {
    setSelectedFloor(floor);
  };
  const selectedFloorData = data.floors.find(
    (floor) => floor._id === selectedFloor
  );

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="overflow-auto"
      >
        <View className="flex-1 mx-auto mt-8">
          <Text className="text-lg text-secondary">Select Space</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            gap: 10,
          }}
        >
          {data.floors.map((floor) => (
            <TouchableOpacity
              key={floor._id}
              onPress={() => handleFloorSelection(floor._id)}
              className={`bg-slate-300 mx-2 w-[27vw] h-7 rounded-md items-center justify-center ${
                selectedFloor === floor._id && "bg-primary"
              }`}
            >
              <Text
                className={`text-${
                  selectedFloor === floor._id ? "white" : "primary"
                }`}
              >
                {floor.floorName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="ml-5 my-5">
          <Text className="font-bold text-lg">Available slots</Text>
        </View>
        <View className="flex-1 min-h-[75vh]">
          {selectedFloorData && (
            <Park
              PricePerHour={PricePerHour}
              floor={selectedFloorData.floorSlots}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Slots;
