import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./src/Screen/Onboarding";
import { AppStore } from "./src/hooks/AppStore";
import { BottomNavigation } from "./src/routes/BottomNavigation";
import { PortalProvider } from "@gorhom/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { getItemAsync } from "expo-secure-store";
import { useEffect } from "react";
import useAuthStore from "./src/hooks/UseAuthStore";

export default function App() {
  const { setAuthStatus, setAuthToken, setAuthProfile } = useAuthStore();
  const { showRealApp, SetshowRealApp } = AppStore();
  useEffect(() => {
    const prepareResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const RealApp = await getItemAsync("showRealApp");
        const Authtoken = await getItemAsync("Authtoken");
        const userData = await getItemAsync("UserData");
        SetshowRealApp(JSON.parse(RealApp));
        if (Authtoken && userData) {
          setAuthStatus(true);
          setAuthToken(Authtoken);
          setAuthProfile(JSON.parse(userData));
        }
      } catch (error) {
        alert(error.message);
      } finally {
        await SplashScreen.hideAsync();
      }
    };
    prepareResources();
  }, [setAuthProfile, setAuthStatus, setAuthToken]);

  return showRealApp ? (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <SafeAreaView>
              <StatusBar style="auto" />
            </SafeAreaView>
            <BottomNavigation />
          </SafeAreaProvider>
          <Toast />
        </NavigationContainer>
      </PortalProvider>
    </GestureHandlerRootView>
  ) : (
    <Onboarding />
  );
}
