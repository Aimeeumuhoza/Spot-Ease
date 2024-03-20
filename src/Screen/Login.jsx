import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";
import useAuthStore from "../hooks/UseAuthStore";
import axios from "axios";
import { setItemAsync } from "expo-secure-store";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
const Login = () => {
  const navigate = useNavigation();
  const { setAuthStatus, setAuthToken, setAuthProfile } = useAuthStore();
  const [isLoading, SetIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    try {
      SetIsLoading(true);
      const options = {
        method: "POST",
        url: `https://smart-parking-api-3g3e.onrender.com/parking/users/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(options)
        .then((response) => {
          Toast.show({
            type: "success",
            text1: "Login Successful",
            text2: response.data.message,
          });
          setAuthToken(response.data.access_token);
          setItemAsync("Authtoken", response.data.access_token);
          setItemAsync("UserData", JSON.stringify(response.data.user));
          setAuthProfile(response.data.user);
          setAuthStatus(true);
          SetIsLoading(false);
        })
        .catch(function (error) {
          console.log(error?.response?.data?.message);
          Toast.show({
            type: "error",
            text1: "Login fail",
            text2: error?.response?.data?.message,
          });
          SetIsLoading(false);
          return;
        });
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    const showToast = () => {
      Toast.show({
        type: "success",
        text1: "Login required",
        text2: "Please first login to proceed 👋",
      });
    };
    showToast();
    return () => {};
  }, []);
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
            Login
          </Text>
          <View>
            <Text className="text-center text-gray-500">
              Login to your account
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
                <Text className="text-sm text-gray-500">Password</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="border-b-2 border-gray-300 focus:outline-none"
                      placeholder="*******"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={true}
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text className="text-xs text-red-500">
                    {errors.password.message}
                  </Text>
                )}
                <TouchableOpacity onPress={() => navigate.navigate("forgotpassword")}>
                <Text className="text-right">Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-col mt-5">
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className="bg-primary rounded-md py-3"
                >
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text className="text-center text-white font-medium">
                      Login
                    </Text>
                  )}
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

export default Login;
