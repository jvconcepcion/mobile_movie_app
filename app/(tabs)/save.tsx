import { images } from "@/constants/images";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Save = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({});
