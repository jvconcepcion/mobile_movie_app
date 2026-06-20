import { images } from "@/constants/images";
import { cn } from "@/lib/utils";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
  className,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className={cn("w-36 relative pl-5", className)}>
        <Image
          source={{
            uri: poster_url
              ? poster_url
              : "https://placeholder.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-1 -left-2.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
