import { Prayer } from "@/components/Prayer";
import { Text } from "@/components/ui/text";
import { images } from "@/constants/indxe";
import useGetPrayersTime from "@/utils/useGetPrayersTime";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

type Timings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

const PrayersPage = () => {
  const { timings, isLoading, error } = useGetPrayersTime() as {
    timings: Timings;
    isLoading: boolean;
    error: string;
  };

  const nextPrayer =
    // timings &&
    // (Object.keys(timings) as (keyof Timings)[]).find((key) => {
    //   const time = timings[key].split(" ")[0];
    //   const [hours, minutes] = time.split(":");
    //   const [currentHours, currentMinutes] = [
    //     new Date().getHours(),
    //     new Date().getMinutes(),
    //   ];
    //   const currentTime = currentHours * 60 + currentMinutes;
    //   const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
    //   return prayerTime > currentTime;
    timings &&
    (Object.keys(timings) as (keyof Timings)[]).find((key) => {
      const time = timings[key].split(" ")[0];
      const [hours, minutes] = time.split(":");
      const [currentHours, currentMinutes] = [
        new Date().getHours(),
        new Date().getMinutes(),
      ];
      const currentTime = currentHours * 60 + currentMinutes;
      const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
      // if the next prayer is after midnight
      if (prayerTime < currentTime) {
        // return jajr
        return key === "Fajr";
      }
      return prayerTime > currentTime;
    });

  const calcHowManyTimeToNextPrayer = () => {
    if (nextPrayer && timings) {
      const time = timings[nextPrayer].split(" ")[0];
      const [hours, minutes] = time.split(":");
      const [currentHours, currentMinutes] = [
        new Date().getHours(),
        new Date().getMinutes(),
      ];
      const currentTime = currentHours * 60 + currentMinutes;
      const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
      const diff = prayerTime - currentTime;
      const hoursDiff = Math.floor(diff / 60);
      const minutesDiff = diff % 60;
      if (hoursDiff < 0 || minutesDiff < 0) {
        return `${24 + hoursDiff}س و ${60 + minutesDiff}د`;
      }
      return `${hoursDiff}س و ${minutesDiff}د`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calcHowManyTimeToNextPrayer();
    }, 60000);
    return () => clearInterval(interval);
  }, [calcHowManyTimeToNextPrayer()]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 bg-gray-100">
        <View
          className="flex flex-row gap-2 items-center justify-end  px-3 py-4"
          onTouchStart={() => {
            router.back();
          }}
        >
          <Text className="text-lg font-cairoBold">أوقات الصلاة</Text>
          <View className="bg-black rounded-full h-5 w-5 flex items-center justify-center">
            <ArrowRight size={14} color="white" />
          </View>
        </View>
        <View className="px-5">
          {isLoading && (
            <Text className="text-center mt-5 h-[90%]">جاري التحميل...</Text>
          )}
          {!isLoading && error && (
            <Text className="text-center mt-6 ">{error}</Text>
          )}
          {nextPrayer && timings && nextPrayer !== "Sunrise" && (
            <View className="items-end mt-6">
              <View className="flex flex-row gap-1">
                <View>
                  {nextPrayer && timings && (
                    <Text className="text-primary font-cairoBold">
                      {calcHowManyTimeToNextPrayer()}
                    </Text>
                  )}
                </View>
                <View>
                  {timings && (
                    <Text className="text-black font-cairoBold">
                      متبقى على أذان{" "}
                      {timings && nextPrayer === "Asr"
                        ? "العصر"
                        : nextPrayer === "Dhuhr"
                        ? "الظهر"
                        : nextPrayer === "Fajr"
                        ? "الفجر"
                        : nextPrayer === "Isha"
                        ? "العشاء"
                        : nextPrayer === "Maghrib"
                        ? "المغرب"
                        : "الشروق"}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          {timings && (
            <ScrollView className="flex-col h-[90%]">
              <Prayer
                title="الفجر"
                value={timings.Fajr.split(" ")[0]}
                nextPrayer={
                  (nextPrayer &&
                    nextPrayer === "Fajr" &&
                    ("الفجر" as string)) ||
                  ""
                }
              />
              <Prayer
                title="الشروق"
                value={timings.Sunrise.split(" ")[0]}
                nextPrayer={
                  (nextPrayer &&
                    nextPrayer === "Sunrise" &&
                    ("الشروق" as string)) ||
                  ""
                }
              />
              <Prayer
                title="الظهر"
                value={timings.Dhuhr.split(" ")[0]}
                nextPrayer={
                  (nextPrayer &&
                    nextPrayer === "Dhuhr" &&
                    ("الظهر" as string)) ||
                  ""
                }
              />
              <Prayer
                title="العَصر"
                value={timings.Asr.split(" ")[0]}
                nextPrayer={
                  (nextPrayer &&
                    nextPrayer === "Asr" &&
                    ("العَصر" as string)) ||
                  ""
                }
              />
              <Prayer
                title="المَغرب"
                value={timings.Maghrib.split(" ")[0]}
                nextPrayer={
                  (nextPrayer &&
                    nextPrayer === "Maghrib" &&
                    ("المَغرب" as string)) ||
                  ""
                }
              />
              <Prayer
                title="العِشاء"
                value={timings.Isha.split(" ")[0]}
                nextPrayer={
                  (nextPrayer &&
                    nextPrayer === "Isha" &&
                    ("العِشاء" as string)) ||
                  ""
                }
              />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrayersPage;
