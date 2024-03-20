import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import useAuthStore from "../hooks/UseAuthStore";

const Payment = ({ route, navigation }) => {
  const [number, setNumber] = useState("");
  const [isloading, SetLaoding] = useState(false);
  const { AuthToken } = useAuthStore();
  const parkData = route.params.parkData;
  const total = parkData.totalPrice;
  const duration = parkData.Duration;
  const date = parkData.bookedDate;
  const carId = parkData.vehicleId;
  const endHour = route.endHour;
  const startHour = route.startHour;
  const slotId = parkData.slotId;
  console.log("payment", parkData._id);

  const makePayment = async () => {
    if (!number) return alert("Please enter your Valid number");
    SetLaoding(true);
    const options = {
      method: "POST",
      url: `https://smart-parking-api-3g3e.onrender.com/parking/momo/pay/${parkData._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
        Accept: "application/json",
      },
      data: {
        number: number,
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      alert(response.data.status);
      navigation.navigate("Receipt");
      SetLaoding(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <View>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ color: "#29859A", fontSize: 20 }}>Payment</Text>
        </View>

        <View
          style={{
            width: "90%",
            marginTop: 20,
            marginLeft: "auto",
            marginRight: "auto",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 5,
            elevation: 5,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <Text style={{ color: "#29859A", marginTop: 10, marginLeft: 5 }}>
            Order Detail
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ marginLeft: 10 }}>
              <Text>Duration</Text>
            </View>

            <View>
              <Text style={{ marginRight: 10, color: "gray" }}>
                {duration} hours
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ marginLeft: 10 }}>
              <Text>Vehicle</Text>
            </View>

            <View>
              <Text style={{ marginRight: 10, color: "gray" }}>
                Ford (AR 343)
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ marginLeft: 10 }}>
              <Text>Date</Text>
            </View>

            <View>
              <Text style={{ marginRight: 10, color: "gray" }}>{date}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 20 }}>Total</Text>
            </View>
            <View>
              <Text style={{ marginRight: 10, color: "gray", fontSize: 20 }}>
                {total} Rwf
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-2 items-center">
          <View className="mt-9 items-center">
            <Text style={{ color: "gray" }}>
              Dial this on Your MTN phone to pay
            </Text>
            <Text>*182*3*008898#</Text>
          </View>
        </View>
        <View
          style={{
            width: "90%",

            marginTop: 20,
            marginLeft: "auto",
            marginRight: "auto",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 5,
            elevation: 5,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <View
            style={{
              marginTop: 5,
              marginLeft: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray", marginTop: 1, padding: 2 }}>
              Just Enter your MTN phone to pay
            </Text>
            <TextInput
              placeholder="ex: 0788"
              keyboardType="numeric"
              maxLength={10}
              value={number}
              onChangeText={(text) => setNumber(text)}
              style={{
                borderColor: "gray",
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                marginBottom: 10,
                width: "90%",
              }}
            />

            {/* <Pressable
              onPress={makePayment}
              style={{
                backgroundColor: "#119DA4",
                borderRadius: 5,
                padding: 10,
                width: "50%",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text style={{ color: "white" }}>Pay {total}</Text>
            </Pressable> */}
            <Pressable
              onPress={makePayment}
              style={{
                backgroundColor: "#119DA4",
                borderRadius: 5,
                padding: 10,
                width: "50%",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}

            >
              {isloading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={{ color: "white" }}>Pay {total}</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Payment;
