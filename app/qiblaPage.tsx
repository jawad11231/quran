import Header from "@/components/Header";
import QiblaCompass from "@/components/QiblaCompass";
import { useColorScheme } from "@/lib/useColorScheme";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { SafeAreaView, Text, View } from "react-native";

const QiblaPage = () => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className=" ">
      <View className="flex flex-row justify-between w-full">
        <View></View>
        <View
          className="flex flex-row gap-2 items-center px-3 py-4"
          onTouchStart={() => {
            router.back();
          }}
        >
          <Text className="text-lg font-cairoBold">اتجاه القبلة</Text>
          <View className="bg-black rounded-full h-5 w-5 flex items-center justify-center">
            <ArrowRight size={14} color="white" />
          </View>
        </View>
      </View>
      <View className="mx-auto my-auto flex items-center justify-center">
        <QiblaCompass
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
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
