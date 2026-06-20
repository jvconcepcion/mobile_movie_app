import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: loadingTrending,
    error: errorTrending,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    }),
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loadingMovies || loadingTrending ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : errorMovies || errorTrending ? (
          <Text className="text-red-500 px-5 my-3">
            Error:{" "}
            {errorMovies?.message ||
              errorTrending?.message ||
              "Something went wrong"}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for movies, TV shows, etc."
              value=""
              onChangeText={() => {}}
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>

                <FlatList
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  keyExtractor={(item) => item.movie_id.toString()}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 20,
                    paddingHorizontal: 5,
                  }}
                />
              </View>
            )}

            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  marginBottom: 10,
                  gap: 20,
                  paddingRight: 5,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
