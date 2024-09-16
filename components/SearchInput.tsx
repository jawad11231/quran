import { Pressable, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Search } from "lucide-react-native";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View className="relative h-12 mt-4">
      <Search
        className="absolute top-[15px] left-[13px]"
        height={17}
        width={20}
      />
      {value.trim() && value.length > 0 && (
        <Pressable
          onPress={() => onChange("")}
          className="absolute top-0 inline-flex justify-center items-center right-0 z-20 w-10 h-12 text-primary/20"
        >
          <AntDesign
            style={{ marginHorizontal: "auto", marginVertical: "auto" }}
            name="close"
            size={20}
            color="#544981"
          />
        </Pressable>
      )}
      <TextInput
        selectionColor="#544981"
        placeholder="بحث"
        blurOnSubmit
        placeholderTextColor="#54498166"
        value={value}
        className="w-full h-full text-right pl-10 font-HelveticaRoman  text-primary dark:text-primaryDark border  border-lotion dark:border-blackCoral rounded-lg"
        onChangeText={(text) => {
          onChange(text);
        }}
      />
    </View>
  );
}
