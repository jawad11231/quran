import { ActivityIndicator, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { ArrowBigDown, ChevronRight } from "lucide-react-native";

interface HeaderProps {
  title: string;
  chevronTitle: string;
  viewList?: boolean;
  viewChevron?: boolean;
}

export const Header = ({
  title,
  chevronTitle,
  viewList = true,
  viewChevron = true,
}: HeaderProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row justify-between py-2 h-[5.5%] items-center border-b border-border mb-4">
      <View className="inline-flex flex-row items-center justify-center h-full ">
        {viewList && (
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
        )}
      </View>
      <View className="flex justify-center items-center text-center">
        <Text className="font-semibold text-lg text-center pl-16">{title}</Text>
      </View>
      {viewChevron && (
        <Pressable
          onPress={() => {
            router.back();
          }}
          className="pr-2 flex flex-row gap-1 items-center"
        >
          <Text>{chevronTitle}</Text>
          <ChevronRight
            size={24}
            className=""
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        </Pressable>
      )}
      {viewChevron === false && <Text> </Text>}
    </View>
  );
};

export default Header;
