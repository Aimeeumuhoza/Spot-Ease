
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import useAuthStore from "../hooks/UseAuthStore";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const EditProfile = ({route}) => {
  const profile=route.params.AuthProfile
    const navigate = useNavigation();
    const { setAuthStatus, AuthProfile, setAuthProfile ,AuthToken} = useAuthStore(
      (state) => state
    );

  const [selectedGender, setSelectedGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [location, setLocation] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [data, setData]=useState("");
  const gender = ["male", "female"];


  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("fullNames", fullNames);
      formData.append("location", location);
      formData.append("phoneNo", phoneNo);

      const API_BASE_URL = 'https://smart-parking-api-3g3e.onrender.com/parking/users/userupdate';
      const response = await axios.put(
        `${API_BASE_URL}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setData(response.data.user);
      setAuthProfile(response.data.user)
      // alert(response.data.message);
      Toast.show({
        type: "success",
        text1: "updated Successful",
        text2: response.data.message,
      });
      navigate.navigate("profilemain")
    } catch (error) {
      alert(error?.response?.data?.message);
      Toast.show({
        type: "error",
        text1: "Fail to Update",
        text2: error?.response?.data?.message,
      });
      console.error('Error', error?.response?.data?.message);
    }

  }
  return (
    <View showsVerticalScrollIndicator={false} className="mt-5 mx-5">
       <ScrollView style={{width:"100%",height:"100%" }}>
        <View className="flex-row space-x-2"></View>

        <View className="flex-row space-x-16">
          <AntDesign
          onPress={() => navigate.goBack()}
          name="arrowleft"
          size={24}
          color="black"
        />
          <Text className="text-lg font-bold">Edit Profile</Text>
         
        </View>
          <View className="flex-row mt-5 bg-white h-9   items-center">
            <TextInput className="px-2 font-semibold" 
             onChangeText={text => setFullNames(text)}
            >
              <Text>{profile.fullNames}</Text>

            </TextInput>
          </View>
          <View className="flex-row mt-5 items-center justify-between bg-white h-9 ">
            <TextInput className=" px-2 font-semibold"
             value={profile.email}
            >
              </TextInput>
              </View>
          <View className="flex-row mt-5 bg-white h-9  items-center">
            <View className="flex-row space-x-3">
              <TextInput className="px-2 font-semibold"
               onChangeText={text => setPhoneNo(text)}
              >
                <Text>{profile.phoneNo}</Text>
              </TextInput>
            </View>
          </View>
          <View className="flex-row mt-5 bg-white h-9  items-center border-black ">
            <View className="mx-2 ">
              <TextInput className="px-2 font-semibold "
               onChangeText={text => setLocation(text)}
              >
              <Text>{profile.location}</Text>
              </TextInput>
            </View>
          </View>
          <View className="mt-5 bg-white ">
            <SelectList
              defaultOption="male"
              dropdownStyles={{
                borderWidth: 0,
              }}
              dropdownTextStyles={{
                fontWeight: "600",
                color: "grey",
                textTransform: "capitalize",
              }}
              searchPlaceholder=""
              search={false}
              boxStyles={{
                height: 40,
                borderWidth: 0,
                borderRadius: 100,
              }}
              inputStyles={{
                borderRadius: 100,
              }}
              data={gender}
              selected={selectedGender}
              setSelected={setSelectedGender}
              placeholder="Select Gender"
            />
          </View>
          <View className="flex flex-col mt-5">
 <TouchableOpacity onPress={(handleUpdate)} className="bg-primary rounded-md py-3">
              <Text className="text-center color-white font-medium">
                Update
              </Text>
            </TouchableOpacity>
         
        </View>
    </ScrollView>
    </View>
  );
};
export default EditProfile;



// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { AntDesign } from "@expo/vector-icons";
// import { SelectList } from "react-native-dropdown-select-list";
// import { useNavigation } from "@react-navigation/native";
// import axios from 'axios';
// import useAuthStore from "../hooks/UseAuthStore";

// const EditProfile = ({ route }) => {
//   const profile = route.params.AuthProfile;
//   const { setAuthProfile, AuthToken } = useAuthStore();
//   const navigate = useNavigation();

//   const [fullNames, setFullNames] = useState(profile.fullNames);
//   const [phoneNo, setPhoneNo] = useState(profile.phoneNo);
//   const [location, setLocation] = useState(profile.location);
//   const [selectedGender, setSelectedGender] = useState(profile.gender || "male");

//   const genderOptions = ["male", "female"];

//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("fullNames", fullNames);
//       formData.append("location", location);
//       formData.append("phoneNo", phoneNo);
//       formData.append("gender", selectedGender);

//       const API_BASE_URL = 'https://smart-parking-api-3g3e.onrender.com/parking/users/userupdate';
//       const response = await axios.put(
//         API_BASE_URL,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${AuthToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setAuthProfile(response.data)
//       console.log(response.data.user);
//       alert(response.data.message);
//       navigate.navigate("profile");
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}>
//         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//           <TouchableOpacity onPress={() => navigate.goBack()}>
//             <AntDesign name="arrowleft" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={{ fontSize: 18, fontWeight: "bold" }}>Edit Profile</Text>
//         </View>

//         <View style={{ marginTop: 10 }}>
//           <TextInput
//             value={fullNames}
//             placeholder="Full Names"
//             onChangeText={text => setFullNames(text)}
//             style={{ borderWidth: 1, borderRadius: 8, height: 40, paddingHorizontal: 10 }}
//           />
//         </View>

//         <View style={{ marginTop: 10 }}>
//           <TextInput
//             value={phoneNo}
//             placeholder="Phone Number"
//             onChangeText={text => setPhoneNo(text)}
//             style={{ borderWidth: 1, borderRadius: 8, height: 40, paddingHorizontal: 10 }}
//           />
//         </View>

//         <View style={{ marginTop: 10 }}>
//           <TextInput
//             value={location}
//             placeholder="Location"
//             onChangeText={text => setLocation(text)}
//             style={{ borderWidth: 1, borderRadius: 8, height: 40, paddingHorizontal: 10 }}
//           />
//         </View>

//         <View style={{ marginTop: 10 }}>
//           <SelectList
//             defaultOption={selectedGender}
//             data={genderOptions}
//             setSelected={setSelectedGender}
//             placeholder="Select Gender"
//           />
//         </View>

//         <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: "blue", borderRadius: 8, marginTop: 20, paddingVertical: 12, alignItems: "center" }}>
//           <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default EditProfile;
