import { View, Text,ScrollView ,TouchableOpacity,ActivityIndicator} from "react-native";
import React ,{ useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import useAuthStore from "../hooks/UseAuthStore";

const Completed = () => {
  const [parkingData, setParkingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const { AuthToken } = useAuthStore();

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://smart-parking-api-3g3e.onrender.com/parking/reservations/getAllCompletedBookingOfUser', {
        headers: {
          Authorization: `Bearer ${AuthToken}`
        }
      });
      setParkingData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
    }
  };

  fetchData();
}, []);
// console.log(parkingData)

if (isLoading)
return (
  <View className="flex-1 items-center justify-center">
    <ActivityIndicator color={"blue"} size={24} />
  </View>
);
if (parkingData.length==0)
return (
  <View className="flex-1 items-center justify-center">
    <Text>You do not have any completed reservation</Text>
  </View>
)
  return (
    <ScrollView
    showsVerticalScrollIndicator={true}
    className="overflow-auto  h-screen pt-4 rounded-t-3xl shadow-lg bg-white p-1"
  >
<View className='items-center mt-4'>
  <Text className='text-secondary text-2xl'>Parking History</Text>
</View>

{parkingData.map(item => (
        <View key={item._id} className="w-11/12  mt-7  mx-auto shadow-2xl bg-white   shadow-black rounded-xl p-3">
          <View className="flex-row justify-between items-center mt-1  ">
            <Text className="text-lg">Makuza peace p.</Text>
            <Text className="text-end mr-7">carPlateNo: {item.carPlateNo}</Text>
          </View>

          <View className="flex-row justify-between mt-4 ">
            <View className=" flex-row space-x-3 ml-4">
              <Text className=" font-light">SlotName:</Text>
              <Text> {item.slotName}</Text>
            </View>
            <View>
              <Text className="text-end mr-7 text-secondary">{item.bookedDate}</Text>
    
            </View>
          </View>
          <View className="flex-row justify-between mt-4 ">
            <View className=" flex-row space-x-3 ml-4">
              <Text className=" font-light">Carplate</Text>
              <Text> {item.carPlateNo}</Text>
            </View>
            <View>
              <Text className="text-end mr-7 text-secondary">{item.bookedDate}</Text>
              <View className="mt-4">
                <Text>{item.Status}</Text>
              </View>
            </View>
          </View>
          
          {/* <TouchableOpacity onPress={() => navigate.navigate("Details")} className="justify-center items-center mt-4 ">
          <View className="ml-4 text-secondary'">
            <Text className="text-secondary ">see Details</Text>
          </View>
        </TouchableOpacity> */}
        
        </View>
      ))}
<Text>.</Text>

</ScrollView>
  );
};

export default Completed;
