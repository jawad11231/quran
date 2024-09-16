import { getSuar } from "@/services/SurahsService";
import { ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";

const Page = () => {
  const { data, isFetched } = useQuery("suar", async () => getSuar(), {
    staleTime: Infinity,
  });

  return (
    <ScrollView>
      <View className=" w-full">
        {data?.map((sura) => (
          <Text key={sura.id}>{sura.name_ar}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default Page;
