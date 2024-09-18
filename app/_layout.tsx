import "@/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { I18nManager, Platform, View } from "react-native";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import RNAppRestart from "@brandingbrand/react-native-app-restart";
import * as Updates from "expo-updates";

const queryClient = new QueryClient();

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  // I18nManager.allowRTL(true);
  // I18nManager.forceRTL(true);
  const shouldBeRTL = true;

  if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== "web") {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    // Updates.reloadAsync();
  }

  const [fontsLoaded, fontError] = useFonts({
    "HelveticaNeueLTArabic-Bold": require("../assets/fonts/HelveticaNeueLTArabic-Bold.ttf"),
    "HelveticaNeueLTArabic-Roman": require("../assets/fonts/HelveticaNeueLTArabic-Roman.ttf"),
    "HelveticaNeueLTArabic-Light": require("../assets/fonts/HelveticaNeueLTArabic-Light.ttf"),
    "amiri-bold": require("../assets/fonts/amiri-bold.ttf"),
    "amiri-regular": require("../assets/fonts/amiri-regular.ttf"),
    "amiri-slanted": require("../assets/fonts/amiri-slanted.ttf"),
    "amiri-boldslanted": require("../assets/fonts/amiri-boldslanted.ttf"),
    "amiri-quran": require("../assets/fonts/amiri-quran.ttf"),
    "amiri-quran-colored": require("../assets/fonts/amiri-quran-colored.ttf"),
  });

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarColor: "#352F44",
            contentStyle: {
              backgroundColor: colorScheme === "dark" ? "#352F44" : "white",
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
