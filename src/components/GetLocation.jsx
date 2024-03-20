import { View, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
const GetLocation = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [regionName, setRegionName] = useState(null);
  const [street, setStreet] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync();

      let region = await Location.reverseGeocodeAsync(location.coords);
      setRegionName(region[0].region);
      setStreet(region[0].street);
    })();
  }, [street, regionName, errorMsg]);

  //let text = <ActivityIndicator size={18} color="black" />;
  let text = "waiting ...";
  if (errorMsg) {
    alert(errorMsg);
  } else if (regionName) {
    text = regionName;
  }
  return (
    <View>
      <Text>
        {text}, {street}
      </Text>
    </View>
  );
};

export default GetLocation;
