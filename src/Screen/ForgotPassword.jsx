import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "../hooks/UseAuthStore";
const schema = yup.object().shape({
  email: yup.string().email().required(),
});
const ForgotPassword = () => {
  const navigate = useNavigation();
  const { setAuthStatus } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    navigate.navigate("verifyotp", { email: data });
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
          <Text className="text-2xl font-bold text-center text-gray-700">
            Forgot Password?
          </Text>
          <View>
            <Text className="text-center text-gray-500">
              Enter your email below to receive instructions
            </Text>

            <View className="mx-4">
              <View className="flex flex-col mt-5">
                <Text className="text-sm text-gray-500">Email</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Enter your email"
                      className="border-b-2 border-gray-300 focus:outline-none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                    />
                  )}
                  name="email"
                />

                {errors.email && (
                  <Text className="capitalize text-xs text-red-500">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View className="flex flex-col mt-5">
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className="bg-primary rounded-md py-3"
                >
                  <Text className="text-center text-white font-medium">
                    Send Reset Instructions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex-row pb-10 items-center right-2 justify-end my-2 mx-4 gap-x-2">
            <Text className="text-center text-gray-500">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigate.navigate("signup")}>
              <Text className="text-center text-primary font-medium">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
