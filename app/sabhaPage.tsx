import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ArrowRight, RotateCcw } from "lucide-react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { router } from "expo-router";
import { useColorScheme } from "@/lib/useColorScheme";

const Sabha = () => {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState<number | undefined>(0);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: 0,
    bottom: 135,
    left: 25,
    right: 25,
  };

  return (
    <SafeAreaView
      className={cn(
        "relative",
        isDarkColorScheme ? "bg-background" : "bg-white"
      )}
    >
      <View className="flex flex-row justify-between w-full">
        <View></View>
        <View
          className="flex flex-row gap-2 items-center px-3 py-4"
          onTouchStart={() => {
            router.back();
          }}
        >
          <Text className="text-lg font-cairoBold">سبحة</Text>
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
      <TouchableWithoutFeedback onPress={() => setCount(count + 1)}>
        <View className="h-full flex justify-between pb-4">
          <View>
            <View className="w-full flex flex-row justify-between items-center px-4">
              <TouchableOpacity onPress={() => setCount(0)}>
                <RotateCcw />
              </TouchableOpacity>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="rounded-full">
                    <Text>الهدف: {target ? target : ""}</Text>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full">
                  <DialogHeader>
                    <DialogTitle className="native:text-lg">
                      تحديد هدف
                    </DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="حدد الهدف"
                    value={target ? target.toString() : ""}
                    onChangeText={(text) => {
                      setTarget(parseInt(text));
                    }}
                    className="w-48"
                  />
                </DialogContent>
              </Dialog>
            </View>
          </View>
          <View className="flex items-center">
            <View
              className={cn(
                "w-72 h-72 rounded-full items-center justify-center",
                (target && count === target) || (target && target < count)
                  ? "bg-emerald-500 "
                  : ""
              )}
            >
              <Text
                className={cn(
                  "text-9xl leading-tight font-cairoBold flex p-0 pt-10",
                  (target && count === target) || (target && target < count)
                    ? isDarkColorScheme
                      ? "text-black"
                      : "text-white"
                    : isDarkColorScheme
                    ? "text-white"
                    : "text-black"
                )}
              >
                {count}
              </Text>
            </View>
          </View>
          <View className="flex justify-center items-center">
            <Select defaultValue={{ value: "apple", label: "Apple" }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  className="text-foreground text-sm native:text-lg"
                  placeholder="Select a fruit"
                />
              </SelectTrigger>
              <SelectContent insets={contentInsets} className="w-[180px]">
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem label="Apple" value="apple">
                    Apple
                  </SelectItem>
                  <SelectItem label="Banana" value="banana">
                    Banana
                  </SelectItem>
                  <SelectItem label="Blueberry" value="blueberry">
                    Blueberry
                  </SelectItem>
                  <SelectItem label="Grapes" value="grapes">
                    Grapes
                  </SelectItem>
                  <SelectItem label="Pineapple" value="pineapple">
                    Pineapple
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Sabha;
