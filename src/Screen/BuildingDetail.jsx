import { View, Text, Dimensions, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
const BuildingDetail = ({ route }) => {
  const { parking } = route.params;
  console.log(parking.Latitude, parking.Longitude);
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="w-11/12  h-screen mx-auto"
    >
      <View className=" h-[85vh] justify-between">
        <View className="flex-1 ">
          <WebView
            style={{ height: 400, width: 400 }}
            source={{
              uri: "https://www.google.rw/maps/@-1.9374779,30.1005458,15.32z?entry=ttu",
            }}
          />
          <View className="py-4">
            <Text className="text-2xl font-bold py-3">
              {parking.buildingName}
            </Text>
            <Text className="text-base font-semibold">
              District:{parking.District}
            </Text>
            <Text className="text-base font-semibold">
              Sector:{parking.Sector}
            </Text>
            <Text className="text-base font-semibold">
              Street:{parking.Street}
            </Text>
            <Text className="text-base font-semibold">
              ${parking.Price}/hour
            </Text>
            <Text className="text-base">{parking.Description}</Text>
          </View>
        </View>
        <Pressable
          className="bg-primary rounded-md p-2"
          onPress={() =>
            navigation.navigate("AvailableSlots", {
              ParkingId: parking._id,
              PricePerHour: parking.Price,
              // parking:parking
            })
          }
        >
          <Text className="text-center text-white">Available slots</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default BuildingDetail;
