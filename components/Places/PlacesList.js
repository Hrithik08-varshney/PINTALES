import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/color";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No places found.</Text>
        <Text style={styles.emptySubText}>Start adding your favorite places!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
      contentContainerStyle={styles.listContent}
      scrollEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default PlacesList;
