import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  ResetPassword
} from "../Screen";

const HomeNavigations = () => {
  const stack = createNativeStackNavigator();
  const { AuthStatus } = useAuthStore();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        headerBackVisible: false,
      }}
      initialRouteName="index"
    >
      {AuthStatus ? (
        <stack.Screen name="index" component={Home} />
      ) : (
        <>
          <stack.Screen name="index" component={AuthHome} />
          <stack.Screen name="login" component={Login} />
          <stack.Screen name="signup" component={Signup} />
          <stack.Screen name="forgotpassword" component={ForgotPassword} />
          <stack.Screen name="verifyotp" component={VerifyOtp} />
          <stack.Screen name="resetpassword" component={ResetPassword} />
        </>
      )}
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
      <stack.Screen name="notification" component={Notification} />
      <stack.Screen name="vehicle" component={SelectVichicle} />
      <stack.Screen name="Receipt" component={Receipt} />
      <stack.Screen name="parkbooking" component={Parkbooking} />
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
      initialRouteName="index"
    >
      <stack.Screen name="index" component={Search} />
    </stack.Navigator>
  );
};
const BookingNavigations = () => {
  const stack = createNativeStackNavigator();
  const { AuthStatus } = useAuthStore();
  return AuthStatus ? (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        headerBackVisible: false,
      }}
      initialRouteName="index"
    >
      <stack.Screen name="index" component={Booking} />
      <stack.Screen name="Details" component={Details} />
      <stack.Screen name="vehicle" component={SelectVichicle} />
    </stack.Navigator>
  ) : (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        headerBackVisible: false,
        presentation: "transparentModal",
      }}
      initialRouteName="index"
    >
      <stack.Screen name="index" component={Login} />
      <stack.Screen name="signup" component={Signup} />
    </stack.Navigator>
  );
};
const ProfileNavigations = () => {
  const stack = createNativeStackNavigator();
  const { AuthStatus } = useAuthStore();
  return AuthStatus ? (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        headerBackVisible: false,
      }}
      initialRouteName="index"
    >
      <stack.Screen name="index" component={Profile} />
      <stack.Screen name="editProfile" component={EditProfile} />
      <stack.Screen name="security" component={Security} />
    </stack.Navigator>
  ) : (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        headerBackVisible: false,
        presentation: "transparentModal",
      }}
      initialRouteName="index"
    >
      <stack.Screen name="index" component={Login} />
      <stack.Screen name="signup" component={Signup} />
    </stack.Navigator>
  );
};

export {
  SearchNavigations,
  BookingNavigations,
  ProfileNavigations,
  HomeNavigations,
};
