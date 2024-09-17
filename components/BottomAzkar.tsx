import { Azkar } from "@/types";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

interface BottomAzkarProps {
  item: Azkar;
  itemLength?: number;
  data?: Azkar[];
  count?: () => void;
}

export const BottomAzkar = ({ item, itemLength, data }: BottomAzkarProps) => {
  return (
    <View
      style={{
        height: 170,
        width: "100%",
        borderTopColor: "#E5E7EB",
        borderTopWidth: 1,
      }}
    >
      <View className="flex flex-row justify-between">
        <Text>ff</Text>
        <Text>ff</Text>
        <View></View>
        <Text>ff</Text>
        <Text>ff</Text>
      </View>
    </View>
  );
};
