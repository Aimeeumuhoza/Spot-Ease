import * as React from "react";
import { Text } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Timer() {
  const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return (
      <Text
        style={{ fontSize: 40, letterSpacing: 6 }}
      >{`${hours}:${minutes}:${seconds}`}</Text>
    );
  };
  return (
    <SafeAreaView className="flex justify-center items-center">
      <CountdownCircleTimer
        isPlaying={true}
        duration={4000}
        size={200}
        strokeWidth={15}
        onComplete={() => {
          alert("Time's up!");
        }}
        colors={["#29859A", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        updateInterval={1}
      >
        {children}
      </CountdownCircleTimer>
    </SafeAreaView>
  );
}
