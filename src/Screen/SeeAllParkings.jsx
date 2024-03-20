import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
const SeeAllParkings = ({ route }) => {
  const { parking } = route.params;
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ParkDetail", { parking: item })}
      style={{
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 4,
        padding: 2,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 1,
      }}
    >
      <Image
        source={{ uri: item.profilePicture }}
        style={{ resizeMode: "contain" }}
        className={`h-28 rounded-t-lg w-full`}
      />
      <View className="m-2">
        <Text className={`mt-2 font-bold`}>{item.buildingName}</Text>
        <View className={`flex-row justify-between items-center`}>
          <Text className={`text-sm text-gray-500`}>{item.Street}</Text>
          <Text className={`mt-1 font-bold`}>${item.Price}/hr</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <View className="flex-row items-center border mb-4 rounded-2xl  w-11/12 mx-auto h-11 space-x-5 border-gray-400">
            <View className="px-4">
              <Feather name="search" size={22} color="gray" className="mx-5" />
            </View>
            <TextInput placeholder="where are you going" />
          </View>
        }
        data={parking}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />
    </View>
  );
};

export default SeeAllParkings;
