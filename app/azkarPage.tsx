import InnerSplash from "@/components/InnerSplash";
import { SearchInput } from "@/components/SearchInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAPI } from "@/lib/fetch";
import { getSuar } from "@/services/SurahsService";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useQuery } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import Swiper from "react-native-swiper";
import { getCategories } from "@/services/CategoryService";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getLocales } from "expo-localization";
// import i18n, { changeLanguage } from "@/i18n";
import * as Updates from "expo-updates";
import i18n from "@/i18n/i18n";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Search, Sun, SunIcon } from "lucide-react-native";
import { Input } from "@/components/ui/input";

const azkarPage = () => {
  // const quran = axios.get("http://api.alquran.cloud/v1/quran/ar.asad", {
  //   method: "GET",
  // }) as Promise<CompleteQuran>;

  // const { data, isFetched } = useQuery("quran", async () => quran, {
  //   staleTime: Infinity,
  // });

  const { t } = useTranslation("home");

  const { data, isLoading } = useQuery("category", async () => getCategories());

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
    <SafeAreaView>
      <ScrollView>
        {/* <View>
        <Text>{t("title")}</Text>
        <Text className="rtl:text-right ltr:text-left">
          Current locale: {i18n.language}
        </Text>
        <Text>Device locale: {getLocales()[0].languageCode}</Text>
        <TouchableOpacity
          onPress={() => {
            i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
          }}
        >
          <Text>ar or en</Text>
        </TouchableOpacity>
      </View> */}
        <Text className="text-4xl font-cairoSemiBold px-3 py-4">الأذكار</Text>
        <View className="flex px-4 relative">
          <Input
            className="native:h-10 bg-muted px-8"
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
              right: 18,
            }}
            height={17}
            width={20}
            color={"gray"}
          />
        </View>
        {/* <View className="flex flex-row flex-wrap gap-2 w-full px-2 justify-center items-center">
        <TouchableWithoutFeedback
          onPress={() => {
            router.push(`/azkar/أذكار الصباح`);
          }}
        >
          <Card className="shadow-none border-none basis-1/2">
            <CardHeader className="flex flex-row justify-between">
              <View></View>
              <SunIcon />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-right">أذكار الصباح</CardTitle>
            </CardContent>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            router.push(`/azkar/أذكار الصباح`);
          }}
        >
          <Card className="shadow-none border-none basis-1/2">
            <CardHeader className="flex flex-row justify-between">
              <View></View>
              <SunIcon />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-right">أذكار الصباح</CardTitle>
            </CardContent>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            router.push(`/azkar/أذكار الصباح`);
          }}
        >
          <Card className="shadow-none border-none basis-1/2">
            <CardHeader className="flex flex-row justify-between">
              <View></View>
              <SunIcon />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-right">أذكار الصباح</CardTitle>
            </CardContent>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            router.push(`/azkar/أذكار الصباح`);
          }}
        >
          <Card className="shadow-none border-none basis-1/2">
            <CardHeader className="flex flex-row justify-between">
              <View></View>
              <SunIcon />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-right">أذكار الصباح</CardTitle>
            </CardContent>
          </Card>
        </TouchableWithoutFeedback>
      </View> */}
        <View className="p-4">
          {data?.map(
            (category, index) =>
              category.cat_name.includes(search) && (
                <Button
                  key={index}
                  variant="secondary"
                  className={cn(
                    "text-2xl w-full border-b border-r border-l border-border rounded-none",
                    // first item rounded top
                    index === 0 ? "rounded-t-lg border-t" : "",
                    // last item rounded bottom
                    index === data.length - 1 ? "rounded-b-lg border-b" : ""
                  )}
                  onPress={() => {
                    router.push(`/azkar/${category.cat_name}`);
                  }}
                >
                  <View className="w-full flex flex-row justify-between">
                    <ChevronLeft />
                    <Text className="text-right text-2xl">
                      {category.cat_name}
                    </Text>
                  </View>
                </Button>
              )
          )}
        </View>
        <View>
          {/* <View className="flex flex-row flex-wrap gap-4 w-full px-1 justify-center pb-20">
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
        </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default azkarPage;
