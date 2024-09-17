import { ActivityIndicator, Pressable, View } from "react-native";
import { Text } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { ArrowBigDown, ChevronRight } from "lucide-react-native";

export const HeaderAzkar = ({ title }: { title: string }) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row justify-between py-2 h-[5.5%] items-center border-b border-border mb-4">
      <View className="inline-flex flex-row items-center justify-center h-full ">
        <Pressable
          className="pl-4"
          // onPress={() => {
          //   if (layout === "ayat") {
          //     storage.set("view_pref", "page");
          //     setLayout?.("page");
          //   } else {
          //     setLayout?.("ayat");
          //     storage.set("view_pref", "ayat");
          //   }
          // }}
        >
          <Feather
            name="list"
            size={24}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        </Pressable>
      </View>
      <View className="flex justify-center items-center text-center ">
        <Text className="font-semibold text-lg text-center">{title}</Text>
      </View>
      <Pressable
        onPress={() => {
          router.back();
        }}
        className="pr-2"
      >
        <ChevronRight
          size={24}
          className=""
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
        />
      </Pressable>
    </View>
  );
};

export default HeaderAzkar;
