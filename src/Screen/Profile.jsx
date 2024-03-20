import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { CustomBottomSheet } from "../components/BottomModal";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import useAuthStore from "../hooks/UseAuthStore";

const Profile = () => {
  const { setAuthStatus, AuthProfile, setAuthProfile } = useAuthStore(
    (state) => state
  );
  const [image, setProfileImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const bottomSheetRef = useRef(null);
  const navigate = useNavigation();
  const pickImage = async () => {
    setLoadingImage(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.canceled) {
        setProfileImage(response.assets[0].uri);
      }
    }
    setLoadingImage(false);
  };
  return (
    <View>
      <View className="mt-4 w-11/12 mx-auto">
        <Text className="text-lg font-bold">Profile</Text>
        <View className="items-center">
          {/* <Image
            className="h-24 w-24 rounded-full"
            style={{ resizeMode: "contain" }}
            source={require("../../assets/rename.png")}
          /> */}
          <View className="py-4 rounded-full h-28 relative  items-center">
            {image ? (
              <Image
                className="h-28 rounded-full  object-contain w-28"
                source={{ uri: image }}
                style={{ resizeMode: "contain" }}
              />
            ) : (
              <Image
                className="h-28 rounded-full  object-contain w-28"
                source={{
                  uri: `https://ui-avatars.com/api/?name=${AuthProfile.fullNames}&background=random&length=1&rounded=true&size=128`,
                }}
                style={{ resizeMode: "contain" }}
              />
            )}

            <Pressable
              disabled={loadingImage}
              onPress={pickImage}
              className="relative z-10 bg-black/50 bottom-8 p-1 rounded-lg left-11"
            >
              {loadingImage ? (
                <ActivityIndicator />
              ) : (
                <Ionicons name="camera-outline" size={20} color="#119DA4" />
              )}
            </Pressable>
          </View>
          <Text className="mt-4 font-bold  capitalize text-lg">
            {" "}
            {AuthProfile.fullNames}
          </Text>
          <Text> {AuthProfile.email}</Text>
        </View>
        <View className="mt-6">
          <TouchableOpacity
            onPress={() =>
              navigate.navigate("editProfile", { AuthProfile: AuthProfile })
            }
            className="flex-row space-x-3"
          >
            <Ionicons name="person-outline" size={15} color="black" />
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <View className="flex-row space-x-3 mt-7">
            <MaterialIcons name="payment" size={15} color="black" />
            <Text>payment</Text>
          </View>
          <View className="flex-row space-x-3 mt-7">
            <Ionicons name="notifications-outline" size={15} color="black" />
            <Text>Notification</Text>
          </View>
          <View className="flex-row space-x-3 mt-7">
            <Image source={require("../../assets/security.png")} />
            <TouchableOpacity onPress={() => navigate.navigate("Security")}>
              <Text>security</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row space-x-3 mt-7">
            <Feather name="help-circle" size={16} color="black" />
            <Text>Help</Text>
          </View>
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.collapse()}
            className="flex-row space-x-3 mt-7 "
          >
            <Feather name="log-out" size={15} color="red" />
            <Text className="text-red-500">logOut</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomBottomSheet bottomRef={bottomSheetRef}>
        <Text className="text-2xl text-center my-2">Logout</Text>
        <Text className="text-center my-2 capitalize">
          Are you sure you want to logout out?
        </Text>
        <TouchableOpacity
          onPress={async () => {
            await deleteItemAsync("Authtoken");
            await deleteItemAsync("UserData");
            setAuthStatus(false);
            alert("You have been logged out");
          }}
          className="bg-primary w-11/12 mx-auto my-1 p-2 rounded-md"
        >
          <Text className="text-center font-medium my-2 capitalize text-white">
            yes, Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.close()}
          className="border border-primary  w-11/12 mx-auto my-1 p-2 rounded-md"
        >
          <Text className="text-center  font-medium my-2 capitalize text-primary">
            cancel
          </Text>
        </TouchableOpacity>
      </CustomBottomSheet>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    // borderTopEndRadius: 5,
    // borderTopLeftRadius: 5,
  },
});
