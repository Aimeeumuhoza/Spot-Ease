import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useAuthStore from "../hooks/UseAuthStore";
import {
  Booking,
  Profile,
  Search,
  Home,
  Login,
  Signup,
  Details,
  EditProfile,
  ParkingHistory,
  Notification,
  Receipt,
  SelectVichicle,
  ParkingTimer,
  Parkbooking,
  SeeAllParkings,
  AuthHome,
  ParkDetail,
  Slots,
  ForgotPassword,
  Security,
  VerifyOtp,
  ResetPassword,
  Payment,
  Completed,
  Ongoing,
  BuildingDetail,
} from "../Screen";

const AuthNavigation = ({ initial }) => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        headerBackVisible: false,
      }}
      initialRouteName={initial || "login"}
    >
      <stack.Screen name="authome" component={AuthHome} />
      <stack.Screen name="login" component={Login} />
      <stack.Screen name="signup" component={Signup} />
      <stack.Screen name="forgotpassword" component={ForgotPassword} />
      <stack.Screen name="verifyotp" component={VerifyOtp} />
      <stack.Screen name="resetpassword" component={ResetPassword} />
    </stack.Navigator>
  );
};

const Protected = ({ isProtected, initial, children }) => {
  const { AuthStatus } = useAuthStore();

  if (isProtected && !AuthStatus) {
    return <AuthNavigation initial={initial} />;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default Protected;
const HomeNavigations = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        headerBackVisible: false,
      }}
      initialRouteName="mainHome"
    >
      <stack.Screen name="mainHome">
        {(props) => (
          <Protected initial="authome" isProtected={true}>
            <Home {...props} />
          </Protected>
        )}
      </stack.Screen>
      <stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerBackVisible: true,
          title: "See All Parkings",
        }}
        name="SeeAll"
        component={SeeAllParkings}
      />
      <stack.Screen
        options={{
          headerShown: true,
          headerBackTitleVisible: true,
          headerBackVisible: true,
        }}
        name="ParkDetail"
        component={ParkDetail}
      />
      <stack.Screen name="AvailableSlots" component={Slots} />
      <stack.Screen name="notification">
        {(props) => (
          <Protected isProtected={true}>
            <Notification {...props} />
          </Protected>
        )}
      </stack.Screen>
      <stack.Screen name="vehicle">
        {(props) => (
          <Protected isProtected={true}>
            <SelectVichicle {...props} />
          </Protected>
        )}
      </stack.Screen>
      <stack.Screen name="Receipt" component={Receipt} />
      <stack.Screen name="parkbooking" component={Parkbooking} />
      <stack.Screen name="Payment" component={Payment} />
    </stack.Navigator>
  );
};
const SearchNavigations = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        headerBackVisible: false,
      }}
      initialRouteName="mainsearch"
    >
      <stack.Screen name="mainsearch" component={Search} />
    </stack.Navigator>
  );
};
const BookingNavigations = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        headerBackVisible: false,
      }}
      initialRouteName="bookingmain"
    >
      <stack.Screen name="bookingmain">
        {(props) => (
          <Protected isProtected={true}>
            <Booking {...props} />
          </Protected>
        )}
      </stack.Screen>

      {/* <stack.Screen name="Details" component={Details} /> */}
    </stack.Navigator>
  );
};
const ProfileNavigations = () => {
  const stack = createNativeStackNavigator();

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        headerBackVisible: false,
      }}
      initialRouteName="profilemain"
    >
      <stack.Screen name="profilemain" options={{ title: "Profile" }}>
        {(props) => (
          <Protected initial={"login"} isProtected={true}>
            <Profile {...props} />
          </Protected>
        )}
      </stack.Screen>
      <stack.Screen name="editProfile" component={EditProfile} />
      <stack.Screen name="Security" component={Security} />
    </stack.Navigator>
  );
};
const stack = createNativeStackNavigator();
const ParkingHistoryy = () => (
  
  <stack.Navigator
  screenOptions={{
    headerShown: true,
    tabBarShowLabel: false,
    headerBackVisible: true,  headerTitleStyle: {
      color: '#29859A',
      textAlign: 'center',

    },
    headerTitleAlign: 'center'
   
  }}
  initialRouteName="on"
  >
    <stack.Screen name="on" component={ParkingHistory}  options={{ headerShown: false }}/>
    <stack.Screen name="Details" component={Details}   options={{ headerShown: true ,color:"blue"}}/>
  </stack.Navigator>
);

const TopTabs = () => { 
  const tabs = createMaterialTopTabNavigator();
  const { AuthStatus } = useAuthStore();
  return AuthStatus ? (
    <tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarIndicatorStyle: {
          backgroundColor: "#119DA4",
          height: 3,
          borderRadius: 10,
          color: "#08c25e",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          textTransform: "capitalize",
          color: "#000",
        },

        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          height: 50,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        },
      }}
      
    >
      <tabs.Screen name="ongoing" component={ParkingHistoryy} />

      <tabs.Screen name="completed" component={Completed} />
    </tabs.Navigator>
  ) : (
    <BookingNavigations />
  );
};

export {
  SearchNavigations,
  BookingNavigations,
  ProfileNavigations,
  HomeNavigations,
  TopTabs,
};
