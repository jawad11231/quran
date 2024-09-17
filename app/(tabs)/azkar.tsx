import InnerSplash from "@/components/InnerSplash";
import { SearchInput } from "@/components/SearchInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAPI } from "@/lib/fetch";
import { getSuar } from "@/services/SurahsService";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCategories } from "@/services/CategoryService";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ThemeToggle } from "@/components/ThemeToggle";

// TODO: add types in a types file
export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
}
export interface CompleteQuran {
  data: {
    data: {
      surahs: Surah[];
    };
  };
}

const Azkar = () => {
  // const quran = axios.get("http://api.alquran.cloud/v1/quran/ar.asad", {
  //   method: "GET",
  // }) as Promise<CompleteQuran>;

  // const { data, isFetched } = useQuery("quran", async () => quran, {
  //   staleTime: Infinity,
  // });

  const { data, isLoading } = useQuery(
    "category",
    async () => getCategories(),
    { staleTime: 2629800000 }
  );

  const [search, setSearch] = useState<string>("");
  const [openCont, setOpenCont] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // const isLastSlide = activeIndex ===
  useFocusEffect(
    useCallback(() => {
      setOpenCont(true);
    }, [])
  );

  return (
    <SafeAreaView className="flex h-full w-full items-center ">
      <ScrollView>
        <View>
          <View className="flex flex-row flex-wrap gap-4 w-full px-1 justify-center pb-20">
            {/* max items in flex-row 2 */}
            {data?.map((category, index) => (
              <Button
                key={index}
                variant="secondary"
                className="basis-5/12 w-full"
                onPress={() => {
                  router.push(`/azkar/${category.cat_name}`);
                }}
              >
                <Text className="w-full text-center">{category.cat_name}</Text>
              </Button>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Azkar;
