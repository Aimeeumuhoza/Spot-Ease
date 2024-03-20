import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Notification = () => {
  const navigate = useNavigation();
  return (
    <View className="flex-1">
      <View className="flex w-11/12 mx-auto flex-row my-2 gap-x-4 items-center">
        <AntDesign
          onPress={() => navigate.goBack()}
          name="arrowleft"
          size={24}
          color="black"
        />
        <Text className="text-xl pl-20 text-center">Notification</Text>
      </View>
      <Text className="w-11/12 mx-auto">Today</Text>
      <View className="my-4 space-y-4 w-11/12 mx-auto">
        <TouchableOpacity
          onPress={() => navigate.navigate("Receipt")}
          className="p-1 flex-row shadow rounded-md"
        >
          <Image
            style={{ width: 80, height: 80, resizeMode: "cover" }}
            source={require("../../assets/success.png")}
          />
          <View className="p-2">
            <Text className="text-xl font-bold">Payement successfully</Text>
            <Text>Transactions with id #SADFJK849S</Text>
          </View>
        </TouchableOpacity>
        <View className="p-1 flex-row shadow rounded-md">
          <Image
            style={{ width: 80, height: 80, resizeMode: "cover" }}
            source={require("../../assets/Failed.png")}
          />
          <View className="p-2">
            <Text className="text-xl capitalize font-bold">
              Payement failed
            </Text>
            <Text>Transactions failed, please try again later.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Notification;
