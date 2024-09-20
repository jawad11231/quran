import Header from "@/components/Header";
import { Prayer } from "@/components/Prayer";
import { Text } from "@/components/ui/text";
import useGetPrayersTime from "@/utils/useGetPrayersTime";
import { SafeAreaView, ScrollView, View } from "react-native";

type Timings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

const Prayers = () => {
  const { timings, isLoading, error } = useGetPrayersTime() as {
    timings: Timings;
    isLoading: boolean;
    error: string;
  };

  return (
    <SafeAreaView>
      <View>
        <Header
          title="مواقيت الصلاة"
          chevronTitle=""
          viewList={false}
          viewChevron={false}
        />
        <View className="px-5">
          {isLoading && (
            <Text className="text-center mt-5 h-[90%]">جاري التحميل...</Text>
          )}
          {!isLoading && error && (
            <Text className="text-center mt-6 ">{error}</Text>
          )}
          {timings && (
            <ScrollView className="flex-col mt-6 h-[90%]">
              <Prayer title="الفجر" value={timings.Fajr.split(" ")[0]} />
              <Prayer title="الشروق" value={timings.Sunrise.split(" ")[0]} />
              <Prayer title="الظُّهْر" value={timings.Dhuhr.split(" ")[0]} />
              <Prayer title="العَصر" value={timings.Asr.split(" ")[0]} />
              <Prayer title="المَغرب" value={timings.Maghrib.split(" ")[0]} />
              <Prayer title="العِشاء" value={timings.Isha.split(" ")[0]} />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Prayers;
