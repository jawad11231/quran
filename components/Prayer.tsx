import { View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Text } from "./ui/text";

export function Prayer({ title, value }: { title: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center bg-lotion dark:bg-blackCoral p-5 rounded-md mt-5">
      <Text className="text-2xl ">{title}</Text>
      <Text className="text-xl">{value}</Text>
    </View>
  );
}
