import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons, Feather } from "@expo/vector-icons";
const Search = ({ navigation }) => {
  const [buildings, setBuildings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://smart-parking-api-3g3e.onrender.com/parking/buildings/getAllBuildingData"
        );
        const json = await response.json();
        setBuildings(json.allBuildings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = buildings.filter((building) => {
      return (
        building.buildingName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        building.District.toLowerCase().includes(searchTerm.toLowerCase()) ||
        building.Street.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredBuildings(filtered);
  }, [searchTerm, buildings]);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  return (
    <View>
      <View className="flex-row justify-between items-center mt-5 mx-3">
        <Text className="text-2xl ">Find your Spot</Text>

        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Text className="text-lg text-primary">Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search buildings..."
          value={searchTerm}
          onChangeText={handleSearch}
        />

        {searchTerm ? (
          <FlatList
            data={filteredBuildings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ParkDetail", { parking: item })
                }
                className=" flex-row justify-between flex w-11/12 mx-auto border-b-2 border-gray-200 mt-6"
              >
                <View className="flex-row">
                  <EvilIcons name="location" size={32} color="black" />
                  <View className="space-y-1">
                    <Text className="font-bold">{item.buildingName}</Text>
                    <Text className="text-xs">{item.District}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View>
            <Text>Where do you want to goo</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  buildingName: {
    marginVertical: 5,
    fontSize: 18,
  },
});

// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { EvilIcons, Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";

// const Search = () => {
//   const navigate = useNavigation();
//   return (
//     <SafeAreaView>
//       <View className="flex-row justify-between items-center mt-5 mx-3">
//         <Text className="text-2xl ">Find your Spot</Text>
//         <TouchableOpacity onPress={() => navigate.navigate("home")} >
//         <Text className="text-lg text-primary">Cancel</Text>
//         </TouchableOpacity>
//       </View>
//       <View className="flex-row  items-center mt-5 w-11/12 mx-auto">
//         <View className=" flex-row items-center justify-between border  flex-1 rounded-2xl  h-11 space-x-5 border-gray-400">
//           <TextInput
//             placeholder="where are you going"
//             className="flex-1 px-1"
//           />
//         </View>
//         <Feather name="search" size={32} color="black" />
//       </View>
//       <View className=" flex-row  justify-between flex w-11/12 mx-auto border-b-2 border-gray-200 mt-6">
//         <View className="flex-row">
//           <EvilIcons name="location" size={32} color="black" />
//           <View>
//             <Text>MP</Text>
//             <Text className="text-xs">Gasabo</Text>
//           </View>
//         </View>
//         <View className="text-end">
//           <Text>$23 per h</Text>
//         </View>
//       </View>
//       <View className=" flex-row  justify-between flex w-11/12 mx-auto border-b-2 border-gray-200  mt-8">
//         <View className="flex-row">
//           <EvilIcons name="location" size={32} color="black" />
//           <View>
//             <Text>Klab</Text>
//             <Text className="text-xs">Gasabo</Text>
//           </View>
//         </View>
//         <View className="text-end">
//           <Text>$23 per h</Text>
//         </View>
//       </View>
//       <View className=" flex-row  justify-between flex mx-auto w-11/12 border-b-2 border-gray-200  mt-8">
//         <View className="flex-row">
//           <EvilIcons name="location" size={32} color="black" />
//           <View>
//             <Text>Rubangura</Text>
//             <Text className="text-xs">Gasabo</Text>
//           </View>
//         </View>
//         <View className="text-end">
//           <Text>$23 per h</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };
