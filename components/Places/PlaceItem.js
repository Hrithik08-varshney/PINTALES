import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const PlaceItem = ({ place, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
