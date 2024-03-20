import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { AppStore } from "../hooks/AppStore";
import { setItemAsync } from "expo-secure-store";
const slides = [
  {
    key: 1,
    title: "Find Parking",
    text2: "Places",
    text3: "Around you Easily",
    text: "Book your parking without any hustle",

    image: require("../../assets/Parking-amico.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Book and pay",
    text2: "Parking",
    text3: "Quickly and safely",
    text: "search for nearest parking space   \n available  around  you  ",
    image: require("../../assets/Parking-bro.png"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Extend Parking Time",
    text3: "As You Need",
    text: "Extend Parking Time",
    image: require("../../assets/Wristwatch.png"),
    backgroundColor: "#22bcb5",
  },
];

export default OnBoarding = () => {
  const { SetshowRealApp } = AppStore();
  const RenderItem = (item) => {
    return (
      <View className="h-80 mt-20 justify-between items-center">
        <Image className="h-64 w-full" source={item.image} />
        <View className="flex flex-wrap mt-14 ">
          <View className="flex-row space-x-2 ">
            <Text className="font-bold text-2xl">{item.title}</Text>
            <Text className="font-bold text-2xl text-primary">
              {item.text2}
            </Text>
          </View>
          <Text className="font-bold text-2xl">{item.text3}</Text>
          <Text className="">{item.text4}</Text>
        </View>
        <Text className="text-center w-min text-black font-normal capitalize">
          {item.text}
        </Text>
      </View>
    );
  };

  const NextButton = () => {
    return (
      <View className=" mx-auto text-white  p-3 rounded-3xl bg-primary">
        <Text className="text-white px-4 font-bold text-center">Next</Text>
      </View>
    );
  };
  const DoneButton = () => {
    return (
      <View className=" mx-auto p-3  bg-primary rounded-3xl	">
        <Text className="text-white px-4 font-bold text-center">Done</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      onDone={() => {
        setItemAsync("showRealApp", JSON.stringify(true));
        SetshowRealApp(true);
      }}
      renderItem={(item) => RenderItem(item.item)}
      activeDotStyle={{ backgroundColor: "#119DA4" }}
      dotStyle={{ backgroundColor: "gray" }}
      bottomButton
      renderNextButton={NextButton}
      renderDoneButton={DoneButton}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
  },
  title: {
    color: "#000",
  },
  text: {
    color: "#000",
  },
});
