import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Receipt = () => {
    const navigate = useNavigation();
    return (
        <View className='mt-4'>
 <AntDesign
          onPress={() => navigate.goBack()}
          name="arrowleft"
          size={24}
          color="black"
        />
            <Text className='text-secondary text-center text-xl'>Receipt</Text>
            <Text className='mx-9 mt-3  font-bold  text-xl '>Booking Receipt</Text>

            <View className="w-9/12 h-4/5  mt-4 justify-between mx-auto shadow-2xl bg-white rounded-sm p-1">
                <View className=" items-center">
                    <View className='mt-4'>
                        <Image className='w-40 h-24' source={require("../../assets/Vector.png")} />
                    </View>
                    <View className="mt-2 ml-4 items-center">
                        <Text className='text-lg'>Smart Parking</Text>
                        <Text>Makuza peace plaza , slot A0012</Text>
                    </View>
                </View>

                <View className="flex-row  mx-1  justify-between">
                    <View className="flex-column">
                        <Text className="text-sm">Time schedule</Text>
                        <Text className="text-sm">07am-09am</Text>
                    </View>
                    <View className="flex-column ">
                        <Text className="text-sm">InvoiceID</Text>
                        <Text className="text-sm">B23-878</Text>
                    </View>
                </View>
                <View className="items-center my-5">
                    <Image className='w-40 ' source={require("../../assets/Vecto.png")} />

                </View>
            </View>
        </View>
    );
};

export default Receipt;