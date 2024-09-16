import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react-native";

export function Header({ onClickMenu }: { onClickMenu?: () => void }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 flex-row justify-between ">
      <Pressable
        onPress={onClickMenu}
        className=" h-18 w-32 pl-4  items-start justify-start "
      >
        <Menu size={24} />
      </Pressable>
      <Pressable>
        <ThemeToggle />
      </Pressable>
    </View>
  );
}
