import { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
const CalenderComponent = ({ selected, setSelected }) => {
 
  return (
    <View>
      <Text>Select date</Text>
      <Calendar
        className="mx-auto"
        style={{
          borderRadius: 20,
          overflow: "hidden",
          marginVertical: 10,
          width: "100%",
          marginHorizontal: "auto",

          elevation: 1,
          borderColor: "rgba(100, 100, 100, 0.2)",
        }}
        minDate={new Date().toISOString().slice(0, 10)}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        enableSwipeMonths={false}
        displayLoadingIndicator={false}
        markingType={"custom"}
        markedDates={{
          [selected]: {
            marked: true,
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "green",
            color: "green",
            customStyles: {
              container: {
                backgroundColor: "#29859A",
              },
              text: {
                color: "white",
                fontWeight: "bold",
              },
            },
          },
        }}
        theme={{
          arrowColor: "#29859A",
          todayTextColor: "#29859A",
          todayButtonFontWeight: "bold",
          todayButtonFontFamily: "monospace",
          "stylesheet.calendar.header": {
            dayTextAtIndex0: {
              color: "black",
            },
            dayTextAtIndex6: {
              color: "gray",
            },
          },
        }}
      />
    </View>
  );
};

export default CalenderComponent;
