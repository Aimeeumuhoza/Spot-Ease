import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { CalenderComponent, SliderComponent } from "../components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import axios from "axios";
import useAuthStore from "../hooks/UseAuthStore";
import { DateTime } from "luxon";

const Parkbooking = ({ route, navigation }) => {
  const parkData = route.params.parkData;
  const { AuthToken } = useAuthStore();
  console.log("park", parkData.slotId);
  const Amount = parkData.PricePerHour;
  const [selected, setSelected] = useState(
    DateTime.now().toFormat("yyyy-MM-dd")
  );
  const [isloading, SetLaoding] = useState(false);
  const [StartHour, setStartHour] = useState(new Date());
  const [endHour, SetendHour] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [showStartHourPicker, setshowStartHourPicker] = useState(false);
  const [showEndHourPicker, setshowEndHourPicker] = useState(false);
  function getHourAndMinute(datetimeString) {
    const datetimeObj = new Date(datetimeString);
    const hour = datetimeObj.getHours().toString().padStart(2, "0");
    const minute = datetimeObj.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }
  const realstarthour = getHourAndMinute(StartHour);
  const realendhour = getHourAndMinute(endHour);

  console.log("real", realstarthour, realendhour);
  const pay = async () => {
    if (!selected) return alert("Please selected the date");
    SetLaoding(true);
    const options = {
      method: "POST",
      url: `https://smart-parking-api-3g3e.onrender.com/parking/reservations/bookParkingSlot/${parkData.slotId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
        Accept: "application/json",
      },
      data: {
        carID: parkData.vehicleId,
        bookedDate: `${selected}`,
        startHour: `${realstarthour}`,
        endHour: `${realendhour}`,
        totalPrice: total,
        Duration: `${duration}`,
      },
    };

    try {
      const response = await axios.request(options);
      alert(response.data.message);

      navigation.navigate("Payment", { parkData: response.data.reservedData });
      SetLaoding(false);
    } catch (error) {
      console.error("Error occurred:", error.response.data);
      SetLaoding(false);
    }
  };

  // const handleSliderChange = (value) => {
  //   const newEndHour = new Date(StartHour);
  //   console.log(newEndHour, "before");
  //   newEndHour.setHours(newEndHour.getHours() + value);
  //   console.log(newEndHour, "after");
  //   SetendHour(newEndHour);
  // };

  const handleSliderChange = (value) => {
    const newEndHour = new Date(StartHour);
    console.log(newEndHour, "before");
    newEndHour.setHours(newEndHour.getHours() + value);
    const adjustedHour = newEndHour.getHours();
    const adjustedMinutes = newEndHour.getMinutes();
    const formattedTime = `${adjustedHour
      .toString()
      .padStart(2, "0")}:${adjustedMinutes.toString().padStart(2, "0")}`;

    console.log(formattedTime, "after");
    SetendHour(formattedTime);
  };

  const handleSliderValue = (value) => {
    setDuration(value);
    console.log(duration, "duration");
  };

  const total = Amount * duration;

  // console.log(total);

  // const calculateTotal = () => {
  //   const total = Amount * duration;
  //   setTotal(total)
  //   console.log(total);
  // }
  console.log(duration, "duration");
  const handleStartTimeChange = (event, selected) => {
    const currentStartTime = selected || StartHour;
    const currentTime = new Date();

    if (currentStartTime < currentTime) {
      setshowStartHourPicker(false);
      return alert("Start time must be in the future");
    } else {
      setshowStartHourPicker(false);
      setStartHour(currentStartTime);
    }
  };

  const handleEndTimeChange = (event, selected) => {
    const currentEndTime = selected || endHour;

    if (currentEndTime < StartHour) {
      setshowEndHourPicker(false);
      return alert("End time must be greater than start time");
    } else {
      setshowEndHourPicker(false);
      SetendHour(currentEndTime);
    }
  };

  return (
    <View className="w-11/12 mb-2 relative flex-1 mx-auto">
      <View>
        <View className="my-1 flex-row items-center gap-x-2">
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={24}
            color="black"
          />
          <Text className="text-xl">Booking</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View>
          <CalenderComponent selected={selected} setSelected={setSelected} />
          <SliderComponent
            startHour={StartHour}
            endHour={endHour}
            setDuration={setDuration}
            setEndHour={SetendHour}
            duration={duration}
            onValueChange={handleSliderValue}
            handleSliderChange={handleSliderChange}
          />
          <View className="my-2 flex-row rounded-md py-1">
            <View className="flex-1 space-y-2">
              <Text>Start Hour</Text>
              <TouchableOpacity
                className="p-2 w-11/12 flex-row justify-between items-center border-[2px] border-gray-400 rounded-md"
                onPress={() => {
                  console.log("clicked");
                  setshowStartHourPicker(true);
                }}
              >
                <Text style={{ letterSpacing: 1 }} className="uppercase">
                  {StartHour.toLocaleTimeString()}
                </Text>
                <Ionicons name="time-outline" size={18} color="black" />
              </TouchableOpacity>
              {showStartHourPicker && (
                <DateTimePicker
                  value={StartHour}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleStartTimeChange}
                />
              )}
            </View>
            <View className="flex-1 space-y-2">
              <Text>End Hour</Text>
              <TouchableOpacity
                onPress={() => setshowEndHourPicker(true)}
                className="p-2 w-11/12 flex-row border-[2px] border-gray-400 justify-between items-center rounded-md"
              >
                <Text style={{ letterSpacing: 1 }} className="uppercase">
                  {endHour.toLocaleTimeString()}
                </Text>
                <Ionicons name="time-outline" size={18} color="black" />
              </TouchableOpacity>
              {showEndHourPicker && (
                <DateTimePicker
                  value={endHour}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleEndTimeChange}
                />
              )}
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text className="text-xl">Total</Text>
            <Text className="text-3xl text-primary">{total} Rwf</Text>
          </View>
          <TouchableOpacity
            className="w-full my-4 p-2 rounded-md bg-primary rouynd"
            onPress={pay}
          >
            {isloading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text className="text-white capitalize text-xl text-center">
                Book
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Parkbooking;
