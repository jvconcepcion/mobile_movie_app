import { icons } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  className?: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average = 0,
  release_date,
  className,
}: MovieCardProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className={cn("w-[30%]", className)}>
        <Image
          source={{
            uri: poster_path
              ? poster_path.startsWith("http")
                ? poster_path
                : `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placeholder.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date ? new Date(release_date).getFullYear() : "N/A"}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
