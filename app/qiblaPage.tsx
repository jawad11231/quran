import QiblaCompass from "@/components/QiblaCompass";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { SafeAreaView, ScrollView, View } from "react-native";

const QiblaPage = () => {
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView
      className={cn("", isDarkColorScheme ? "bg-muted" : "bg-white")}
    >
      <View className="flex flex-row justify-between w-full">
        <View></View>
        <View
          className="flex flex-row gap-2 items-center px-3 py-4"
          onTouchStart={() => {
            router.back();
          }}
        >
          <Text className="text-lg font-cairoBold">اتجاه القبلة</Text>
          <View
            className={cn(
              "rounded-full h-5 w-5 flex items-center justify-center",
              isDarkColorScheme ? "bg-white" : "bg-black"
            )}
          >
            <ArrowRight
              size={14}
              color={isDarkColorScheme ? "black" : "white"}
            />
          </View>
        </View>
      </View>
      <View className="mx-auto my-auto flex items-center justify-center ">
        <QiblaCompass
          color={isDarkColorScheme ? "White" : "Black"}
          backgroundColor="transparent"
          // compassImage={
          //   colorScheme === "dark"
          //     ? require("../assets/images/compass_dark.png")
          //     : require("../assets/images/compass_light.png")
          // }
          textStyles={{
            textAlign: "center",
            fontSize: 24,
            fontFamily: "Cairo-SemiBold",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default QiblaPage;
