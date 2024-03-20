import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import useAuthStore from "../hooks/UseAuthStore";
import axios from "axios";
const schema = yup.object().shape({
  existingPassword: yup.string().required(),
  newPassword: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required(),
});
const Security = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { AuthToken } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    const options = {
      method: "PATCH",
      url: `https://smart-parking-api-3g3e.onrender.com/parking/password/changepassword`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      data: data,
    };
    axios
      .request(options)
      .then((response) => {
        alert(response.data.message);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.error(err.response);
        setIsLoading(false);
      });
  };
  return (
    <View>
      <View className="my-1 flex-row items-center gap-x-2">
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text className="text-xl">Security</Text>
      </View>
      <Text className="text-center my-4 text-2xl">Change Password</Text>
      <View className="w-11/12 mx-auto space-y-1 capitalize">
        <Text className="text-black">Current Password</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 p-1 px-2 rounded-md  w-full"
              placeholder="Current Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="existingPassword"
        />
        {errors.existingPassword && (
          <Text className="capitalize text-xs text-red-500">
            {errors.existingPassword.message}
          </Text>
        )}
        <Text>New Password</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 p-1 px-2 rounded-md  w-full"
              placeholder="New Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="newPassword"
        />
        {errors.newPassword && (
          <Text className="capitalize text-xs text-red-500">
            {errors.newPassword.message}
          </Text>
        )}
        <Text>Confirm Password</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 p-1 px-2 rounded-md  w-full"
              placeholder="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text className="capitalize text-xs text-red-500">
            {errors.confirmPassword.message}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View className="bg-primary w-11/12 mx-auto my-4 py-2 rounded-md">
          {isLoading ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Text className="text-center text-white text-lg">Save</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Security;
