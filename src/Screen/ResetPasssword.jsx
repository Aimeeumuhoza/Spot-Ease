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
  password: yup.string().min(6).required(),
  Repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});
const ResetPassword = () => {
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
    setAuthStatus(true);
  };

  return (
    <View className="flex-1 z-10  min-h-[100vh] pt-5  w-full  bg-black/50">
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
            Reset Your Password
          </Text>
          <View>
            <Text className="text-center text-gray-500">
              Enter new password to get started
            </Text>

            <View className="mx-4">
              <View className="flex flex-col mt-5">
                <Text className="text-sm text-gray-500">New password</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
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
              </View>
              <View className="flex flex-col mt-5">
                <Text className="text-sm text-gray-500">
                  Confirm New Password
                </Text>
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
                  <Text className="text-center text-white font-medium">
                    Reset Password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex-row pb-10 items-center right-2 justify-end my-2 mx-4 gap-x-2">
            <Text className="text-center text-gray-500">
              Still Having touble ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigate.navigate("signup")}>
              <Text className="text-center text-primary font-medium">
                Contact US
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPassword;
