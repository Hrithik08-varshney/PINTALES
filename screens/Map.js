import React, { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";

const Map = ({ navigation, route }) => {
  const initialLocation = route?.params?.initialLocation || null;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{ marginRight: 12 }}
          onPress={() => {
            if (!selectedLocation) {
              Alert.alert("No location", "Please select a location first.");
              return;
            }
            navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
          }}
        >
          <Ionicons name="checkmark" size={24} color="#fff" />
        </Pressable>
      ),
    });
  }, [navigation, selectedLocation]);

  const selectLocationHandler = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude, address: null });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          initialLocation
            ? {
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            title="Picked Location"
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        )}
      </MapView>
      {!selectedLocation && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Tap on the map to pick a location</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  hintContainer: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 8,
  },
  hintText: { color: "#fff" },
});

export default Map;