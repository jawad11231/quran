import InnerSplash from "@/components/InnerSplash";
import { SearchInput } from "@/components/SearchInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAPI } from "@/lib/fetch";
import { getSuar } from "@/services/SurahsService";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import {
  ArrowRight,
  ChevronLeft,
  Search,
  Sun,
  SunIcon,
} from "lucide-react-native";
import { Input } from "@/components/ui/input";
import { images } from "@/constants/indxe";

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
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 bg-gray-100">
        <View
          className="flex flex-row gap-2 items-center justify-end  px-3 py-4"
          onTouchStart={() => {
            router.back();
          }}
        >
          <Text className="text-lg font-cairoBold">الأذكار</Text>
          <View className="bg-black rounded-full h-5 w-5 flex items-center justify-center">
            <ArrowRight size={14} color="white" />
          </View>
        </View>
        <View className="p-2 px-4 flex flex-col gap-4">
          <View className="rounded-3xl">
            <ImageBackground
              resizeMode="cover"
              source={images.islamicPattern}
              style={{
                padding: 10,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <Text className="leading-8 text-white">
                اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا
                تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ
                وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا
                بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ
                وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ
                وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ
                حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ
              </Text>
            </ImageBackground>
          </View>
          <View style={[styles.frameParent, styles.frameFlexBox]}>
            <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => {
                router.push(`/azkar/أذكار المساء`);
              }}
            >
              <View style={[styles.parent, styles.parentFlexBox]}>
                <Text style={[styles.text2, styles.textTypo]}>
                  أذكار المساء
                </Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.moon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => router.push(`/azkar/أذكار الصباح`)}
            >
              <View style={[styles.parent, styles.parentFlexBox]}>
                <Text style={[styles.text, styles.textTypo]}>أذكار الصباح</Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.fajr}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => {
                router.push(`/azkar/أذكار الاستيقاظ من النوم`);
              }}
            >
              <View style={[styles.parent, styles.parentFlexBox]}>
                <Text style={[styles.text, styles.textTypo]}>
                  أذكار الاستيقاظ
                </Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.sleepDisorder}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => {
                router.push(`/azkar/أذكار النوم`);
              }}
            >
              <View style={styles.parentFlexBox}>
                <Text style={[styles.text2, styles.textTypo]}>أذكار النوم</Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.sleep}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => {
                router.push(`/azkar/دعاء الخروج من المسجد`);
              }}
            >
              <View style={styles.parentFlexBox}>
                <Text style={[styles.text2, styles.textTypo]}>
                  إذكار الخروج من المسجد
                </Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.shalat}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.frameGroup, styles.frameFlexBox]}
              onPress={() => {
                router.push(`/azkar/أذكار الآذان`);
              }}
            >
              <View style={styles.parentFlexBox}>
                <Text style={[styles.text2, styles.textTypo]}>
                  أذكار الآذان
                </Text>
              </View>
              <Image
                style={styles.frameChild}
                resizeMode="cover"
                source={images.nabawiMosque}
              />
            </TouchableOpacity> */}
          </View>
          <View>
            <View className="flex px-2 relative">
              <Input
                className="native:h-10 px-8 bg-white"
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
                  right: 16,
                }}
                height={17}
                width={20}
                color={"gray"}
              />
            </View>
            <View className="p-4 px-2">
              {data?.map(
                (category, index) =>
                  category.cat_name.includes(search) && (
                    <Button
                      key={index}
                      variant="outline"
                      className={cn(
                        "text-2xl w-full bg-white border-b-0 rounded-none shadow-none",
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default azkarPage;

const styles = StyleSheet.create({
  frameFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  parentFlexBox: {
    // gap: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  textTypo: {
    color: "#111f20",
    fontFamily: "Alexandria-SemiBold",
    fontWeight: "600",
    lineHeight: 16,
    fontSize: 14,
    textAlign: "right",
  },
  text: {
    textAlign: "right",
    alignSelf: "stretch",
  },
  text1: {
    fontSize: 12,
    fontFamily: "Alexandria-Regular",
    color: "#999",
    textAlign: "right",
    alignSelf: "stretch",
  },
  parent: {
    width: 81,
  },
  frameChild: { width: 48, height: 48 },
  frameGroup: {
    borderRadius: 12,
    backgroundColor: "#fff",
    width: 173,
    height: 120,
    justifyContent: "flex-end",
    padding: 12,
    gap: 10,
  },
  text2: {
    textAlign: "right",
    letterSpacing: 0.5,
  },
  frameParent: {
    gap: 8,
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "stretch",
  },
});
