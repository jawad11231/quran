import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { images } from "@/constants/indxe";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";
import { getAyatNumberBySuar, getSuar } from "@/services/SurahsService";
import axios from "axios";
import { router } from "expo-router";
import { ArrowRight, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";

interface surah {
  data: {
    id: number;
    number: number;
    name_ar: string;
    type: string;
    created_at: string;
    updated_at: string;
  }[];
}

const QuranPage = () => {
  const { data, isFetched } = useQuery("suar", async () => getSuar(), {
    staleTime: Infinity,
  });
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  //   console.log(data);

  const [surahs, setSurahs] = useState<surah | undefined>(
    data ? { data } : undefined
  );
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (data && search !== "" && surahs) {
      const filteredData = surahs.data.filter((item) =>
        item.name_ar.includes(search)
      );
      setSurahs({ data: filteredData });
    } else {
      setSurahs({
        data: data ? data : [],
      });
    }
  }, [search, data]);

  return (
    <SafeAreaView
      className={cn(
        "flex-1 ",
        isDarkColorScheme ? "bg-background" : "bg-gray-100"
      )}
    >
      <ScrollView className="flex-1">
        <View
          className="flex flex-row gap-2 items-center justify-end  px-3 py-4"
          onTouchStart={() => {
            router.back();
          }}
        >
          <Text className="text-lg font-cairoBold">القرآن الكريم</Text>
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
        <View className="flex flex-col gap-4 p-4 w-full">
          <View className="rounded-3xl">
            <ImageBackground
              resizeMode="cover"
              source={require("../assets/images/quranBackground.png")}
              style={{
                padding: 10,
                borderRadius: 16,
                overflow: "hidden",
                height: 150,
              }}
            >
              <View className="flex flex-row justify-between items-center p-4">
                <View>
                  <Image
                    source={require("../assets/images/quran2.png")}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View className="flex flex-col justify-between h-full">
                  <View className="flex flex-col">
                    <Text className="text-lg font-cairoBold text-white">
                      آخر ما تم قراءته
                    </Text>
                    <Text className="text-white font-cairoSemiBold">
                      اخر سورة تمت قراءتها في التطبيق
                    </Text>
                  </View>
                  <View className="flex flex-col">
                    <Text className="text-lg font-cairoBold text-white">
                      سور الكهف
                    </Text>
                    <Text className="text-white font-cairoSemiBold">
                      الآية 110
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <Text className="text-lg font-cairoBold">سور القرآن الكريم</Text>
          {isFetched && surahs && (
            <View className="flex flex-col gap-4">
              <View className="flex relative">
                <Input
                  className={cn(
                    "native:h-10 px-10",
                    isDarkColorScheme ? "bg-muted" : "bg-white"
                  )}
                  placeholder="بحث"
                  value={search}
                  onChangeText={(text) => {
                    setSearch(text);
                  }}
                />
                <Search
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                  height={17}
                  width={20}
                  color={"gray"}
                />
              </View>
              <View className="flex flex-col gap-2">
                {surahs.data.map((item, index) => (
                  <TouchableOpacity
                    key={item.number}
                    className={cn(
                      " rounded-lg flex flex-row justify-between p-4 items-center",
                      isDarkColorScheme ? "bg-muted" : "bg-white"
                    )}
                    onPress={() => {
                      router.push(`/surah/${item.number}`);
                    }}
                  >
                    <View>
                      <Image
                        source={require("../assets/images/quran2.png")}
                        style={{ width: 50, height: 50 }}
                      />
                    </View>
                    <View className="flex flex-col">
                      <Text className="text-lg font-cairoBold">
                        {item.name_ar}
                      </Text>
                      <Text className="text-lg font-cairoSemiBold text-muted-foreground">
                        عدد آياتها {getAyatNumberBySuar(item.number)} -{" "}
                        {item.type === "Meccan" ? "مكية" : "مدنية"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {!isFetched && (
            <Text className="text-center mt-5 h-[90%]">جاري التحميل...</Text>
          )}
          {isFetched && !surahs && (
            <Text className="text-center mt-5 h-[90%]">لا توجد بيانات</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuranPage;
