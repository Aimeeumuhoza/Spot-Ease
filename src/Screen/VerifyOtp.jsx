import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const VerifyOtp = () => {
  const navigate = useNavigation();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    if (isNaN(text)) return false;

    otp[index] = text;
    setOtp([...otp]);

    //Focus next input
    if (index < otp.length - 1 && text) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 z-10  min-h-[100vh] pt-5  w-full  bg-black/50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="overflow-auto h-screen pt-4 pb-4 rounded-t-3xl shadow-lg bg-white"
        >
          <Image
            className="h-44 w-full"
            style={{ resizeMode: "contain" }}
            source={require("../../assets/mobileLogin.png")}
          />
          <View className="w-11/12 mx-auto justify-center items-center">
            <Text style={styles.title}>Verify OTP</Text>
            <View style={styles.inputContainer}>
              {Array(6)
                .fill(0)
                .map((_, idx) => {
                  return (
                    <TextInput
                      className="border-2 border-gray-300 rounded-md p-2 w-1/2"
                      key={`otp_${idx}`}
                      ref={(ref) => (inputsRef.current[idx] = ref)}
                      style={styles.input}
                      keyboardType="numeric"
                      value={otp[idx]}
                      onChangeText={(text) => handleChange(text, idx)}
                      maxLength={1}
                    />
                  );
                })}
            </View>
          </View>
          <Text className="text-center" style={styles.otpText}>
            OTP Entered - {otp.join("")}
          </Text>
          <TouchableOpacity
            onPress={() => navigate.navigate("resetpassword")}
            className="my-4 bg-primary rounded-md w-11/12 mx-auto p-3"
          >
            <Text className="text-center font-medium text-white">Verify</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    textAlign: "center",
    margin: 5,
  },
  otpText: {
    fontSize: 17,
    color: "green",
  },
});

export default VerifyOtp;
