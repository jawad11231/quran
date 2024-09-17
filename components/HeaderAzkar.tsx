import { ActivityIndicator, Pressable, View } from "react-native";
import { Text } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";

export function HeaderAzkar({ title }: { title?: string }) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row justify-between pl-4 py-4 h-[8%] bg-white dark:bg-darkBg items-center">
      <View className="inline-flex flex-row items-center justify-center h-full">
        <Pressable
          onPress={() => {
            router.back();
          }}
          className="  items-center justify-end !w-10 flex-3 "
        >
          <AntDesign
            name="arrowright"
            size={24}
            className="rotate-180"
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        </Pressable>
      </View>
      <Pressable className="bg-white dark:bg-darkBg items-center h-10 inline-flex justify-center">
        <Text className="font-HelveticaRoman text-lg text-primary dark:text-primaryDark text-center">
          {title}
        </Text>
      </Pressable>
      <Pressable
        className=" w-24 pr-4  h-32  inline-flex justify-center"
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
  );
}
