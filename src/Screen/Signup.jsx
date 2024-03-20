import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from "react-native";
import React,{useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import useAuthStore from "../hooks/UseAuthStore";
import Toast from "react-native-toast-message";

const schema = yup.object().shape({
  fullNames: yup.string().required(),
  email: yup.string().email().required(),
  location:yup.string().required(),
  phoneNo: yup.string().required(),
  password: yup.string().min(6).required(),
  Repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

const Signup = () => {
  const navigate = useNavigation();
  const { setAuthStatus } = useAuthStore();
  const [isLoading, SetIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      SetIsLoading(true);
      const response = await axios.post('https://smartparkingsystem.onrender.com/parking/users/signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAuthStatus(true);
      console.log(response.data);
      // alert(response.data.message);
      Toast.show({
        type: "success",
        text1: "Signup Successful",
        text2: response.data.message,
      });
      SetIsLoading(false);
    } catch (error) {
      console.error('Error', error.response.data.message);
      // alert(error.response.data.message)
      Toast.show({
        type: "error",
        text1: "SignUp failed",
        text2: error?.response?.data?.message,
      });
      SetIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 z-10 pb-10 pt-5 min-h-screen  w-full  bg-black/50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="overflow-auto  h-screen pt-4 rounded-t-3xl shadow-lg bg-white"
        >
          <Text className="text-2xl font-bold text-center text-gray-700">
            Sign up
          </Text>
          <View>
            <Text className="text-center text-gray-500">
              Create your Account
            </Text>

            <View className="mx-4">
              <View className="flex flex-col mt-5">
                <Text className="text-sm text-gray-500">Full Name</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Enter your name"
                      className="border-b-2 border-gray-300 focus:outline-none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="fullNames"
                />
                {errors.fullNames && (
                  <Text className="capitalize text-xs text-red-500">
                    {errors.fullNames.message}
                  </Text>
                )}
              </View>
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
                <Text className="text-sm text-gray-500">Address</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Address"
                      className="border-b-2 border-gray-300 focus:outline-none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                     
                    />
                  )}
                  name="location"
                />
                {errors.location && (
                  <Text className="capitalize text-xs text-red-500">
                    {errors.location.message}
                  </Text>
                )}
              </View>
              <View className="flex flex-col mt-5">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder=" 0788 "
                      className="border-b-2 border-gray-300 focus:outline-none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                  )}
                  name="phoneNo"
                />
                {errors.phoneNo && (
                  <Text className="capitalize text-xs text-red-500">
                    {errors.phoneNo.message}
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
                  <Text className="capitalize text-xs text-red-500">
                    {errors.password.message}
                  </Text>
                )}
              </View>
              <View className="flex flex-col mt-5">
                <Text className="text-sm text-gray-500">Confirm Password</Text>
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
                  name="Repassword"
                />
                {errors.Repassword && (
                  <Text className="capitalize text-xs text-red-500">
                    {errors.Repassword.message}
                  </Text>
                )}
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
                    SignUp
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
            <TouchableOpacity onPress={() => navigate.navigate("login")}>
              <Text className="text-center text-primary font-medium">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
