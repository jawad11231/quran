import { Text } from "@/components/ui/text";
import { icons } from "@/constants/indxe";
import { cn } from "@/lib/utils";
import { Stack, Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  source,
  focused,
  title,
}: {
  source: ImageSourcePropType;
  focused: boolean;
  title: string;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${
      focused ? "" : ""
    }`}
  >
    <View
      className={`flex flex-col gap-1 rounded-full w-12 h-12 items-center justify-center ${
        focused ? "" : ""
      }`}
    >
      <Image
        source={source}
        tintColor={focused ? "#2563EB" : "gray"}
        resizeMode="contain"
        className="w-7 h-7"
      />
      <Text
        className={cn("text-sm", focused ? "text-primary" : "text-gray-500")}
      >
        {title}
      </Text>
    </View>
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="azkar"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",

        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
          color: "black",
        },
        tabBarStyle: {
          // backgroundColor: "#333333",
          // borderRadius: 50,
          // paddingBottom: 0, // ios only
          paddingTop: 10,
          overflow: "hidden",
          // marginHorizontal: 20,
          // marginBottom: 20,
          // height: 78,
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center",
          flexDirection: "row",
        },
      }}
    >
      <Tabs.Screen
        name="azkar"
        options={{
          title: "أذكار",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.azkar} focused={focused} title="أذكار" />
          ),
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: "صلوات",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.salat} focused={focused} title="صلوات" />
          ),
        }}
      />
      <Tabs.Screen
        name="qibla"
        options={{
          title: "القبلة",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.kaaba} focused={focused} title="القبلة" />
          ),
        }}
      />
      <Tabs.Screen
        name="sabha"
        options={{
          title: "السبحة",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.sabha} focused={focused} title="السبحة" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
