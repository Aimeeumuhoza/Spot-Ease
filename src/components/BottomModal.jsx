// import React, { useCallback, useMemo, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   TextInput,
//   KeyboardAvoidingView,
// } from "react-native";
// import BottomSheet, {
//   BottomSheetBackdrop,
// } from "@gorhom/bottom-sheet";
// import { Portal, PortalHost } from "@gorhom/portal";
// const BottomModal = () => {
//   const bottomSheetRef = useRef(null);
//   const [text, setText] = useState("");
//   const snapPoints = useMemo(() => ["35%", "50%", "90%"], []);

//   const renderBackdrop = useCallback(
//     (props) => (
//       <BottomSheetBackdrop
//         {...props}
//         disappearsOnIndex={-1}
//         appearsOnIndex={0}
//       />
//     ),
//     []
//   );
//   const inputStyle = useMemo(
//     () => [
//       styles.input,
//       {
//         height: Math.max(60, text.length * 20),
//       },
//     ],
//     [text]
//   );
//   return (
//     <>
//       <Pressable onPress={() => bottomSheetRef.current?.expand()}>
//         <Text>open</Text>
//       </Pressable>
//       <Portal className="flex-1">
//         <BottomSheet
//           backdropComponent={renderBackdrop}
//           index={1}
//           ref={bottomSheetRef}
//           snapPoints={snapPoints}
//           enablePanDownToClose={true}
//         >
//           <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "padding"}
//             keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
//             style={{ flex: 1 }}
//           >
//             <View style={styles.contentContainer}>
//               <Text>Awesome 🎉</Text>
//             </View>

//             <TextInput style={inputStyle} />
//           </KeyboardAvoidingView>
//         </BottomSheet>
//       </Portal>
//       <PortalHost name="custom_host" />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//   },
//   contentContainer: {
//     paddingVertical: 10,
//     paddingHorizontal: 24,
//   },
//   input: {
//     alignSelf: "stretch",
//     marginHorizontal: 12,
//     marginBottom: 12,
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: "grey",
//     color: "white",
//     textAlign: "center",
//   },
// });

// export default BottomModal;
import React from "react";
import { Portal } from "@gorhom/portal";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useRef, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

export const CustomBottomSheet = ({ children, bottomRef }) => {
  // variables
  const snapPoints = useMemo(() => ["40%", "50%", "80%"], []);

  // callbacks
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <Portal>
      <BottomSheet
        backdropComponent={renderBackdrop}
        index={-1}
        ref={bottomRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        {children}
      </BottomSheet>
    </Portal>
  );
};

// const BottomModal = () => {
//   const bottomSheetRef = useRef(null);
//   const [text, setText] = useState("");

//   return (
//     <>
//       <Pressable onPress={() => bottomSheetRef.current?.expand()}>
//         <Text>open</Text>
//       </Pressable>
//       <CustomBottomSheet bottomRef={bottomSheetRef}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
//           style={{ flex: 1 }}
//         >
//           <View style={styles.contentContainer}>
//             <Text>Awesome 🎉</Text>
//           </View>

//           <TextInput
//             style={styles.input}
//             value={text}
//             onChangeText={setText}
//             placeholder="Enter some text"
//             multiline
//           />
//         </KeyboardAvoidingView>
//       </CustomBottomSheet>
//     </>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  input: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
});

//export default BottomModal;
