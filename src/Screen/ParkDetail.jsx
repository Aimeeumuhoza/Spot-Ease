import { View, Text, Dimensions, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Callout } from "react-native-maps";
const ParkDetail = ({ route }) => {
  const { parking } = route.params;
  console.log(parking.Latitude);
  console.log(parking.Longitude);
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("window").height;
const latitude=parking.Latitude
const longitude=parking.Longitude
// console.log(latitude,longitude)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="w-11/12 flex-1  mx-auto"
    >
      <View className=" justify-between">
        <View className="flex-1 ">
          <MapView
            style={{
              width: "100%",
              height: screenHeight * 0.5,
              borderRadius: 10,
              borderRadius: 10,
            }}
            initialRegion={{
              latitude: parseFloat(parking.Latitude),
              longitude: parseFloat(parking.Longitude),
              latitudeDelta: 0.011,
              longitudeDelta: 0.011,
            }}
            zoomEnabled={true}
            scrollEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            zoomTapEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(parking.Latitude),
                longitude: parseFloat(parking.Longitude),
              }}
              // coordinate={{latitude,longitude}}
              title={parking.buildingName}
              description={parking.District}
            >
              <Callout tooltip>
                <View>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 6,
                      padding: 10,
                    }}
                  >
                    <Text>{parking.buildingName}</Text>
                    <Text>{parking.District}</Text>
                    <Text>${parking.Price} / hour</Text>
                  </View>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: "white",
                      transform: [{ rotate: "45deg" }],
                      marginTop: -8,
                    }}
                  />
                </View>
              </Callout>
            </Marker>
          </MapView>
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
            <Text className="text-base truncate leading-6">
              {parking.Description.length > 50
                ? `${parking.Description.substring(0, 105)} ...`
                : parking.Description}
            </Text>
          </View>
        </View>
        <Pressable
          className="bg-primary rounded-md my-4 p-2"
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

export default ParkDetail;
