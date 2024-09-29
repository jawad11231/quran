import { Image, View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Text } from "./ui/text";
import { cn } from "@/lib/utils";

export function Prayer({
  title,
  value,
  nextPrayer,
}: {
  title: string;
  value: string;
  nextPrayer: string;
}) {
  return (
    <View
      className={`bg-white flex-row justify-between items-center text-center bg-lotion dark:bg-blackCoral p-5 pt-6 rounded-xl mt-5 ${
        nextPrayer === title && "border-2 border-primary"
      }`}
    >
      <Text className="text-xl font-cairoMedium">{value}</Text>
      <Text className="text-xl font-cairoBold">{title}</Text>
    </View>
  );
}
