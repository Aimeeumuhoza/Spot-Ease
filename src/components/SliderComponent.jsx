import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { DateTime } from "luxon";

const SliderComponent = ({
  startHour,
  endHour,
  setEndHour,
  onValueChange,
  duration,
}) => {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const start = DateTime.fromJSDate(startHour);
    const end = DateTime.fromJSDate(endHour);

    const duration = end.diff(start, "hours").hours;
    setSliderValue(duration);
  }, [startHour, endHour]);

  const handleSliderChange = (value) => {
    const newEndHour = DateTime.fromJSDate(startHour)
      .plus({ hours: value })
      .toJSDate();
    console.log(newEndHour, "end hour");
    setEndHour(newEndHour);
    onValueChange(value);
    setSliderValue(value);
  };

  return (
    <View>
      <Text>Duration</Text>
      <Slider
        style={{ width: "100%", padding: 2, borderWidth: 4 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        onValueChange={handleSliderChange}
        value={sliderValue}
        minimumTrackTintColor="#29859A"
        maximumTrackTintColor="#000000"
        thumbTintColor="#29859A"
      />
      <Text className="text-right">{duration} hours</Text>
    </View>
  );
};

export default SliderComponent;
