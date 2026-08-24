import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";

const LocationPicker = ({ onLocationPicked = () => {}, pickedLocation: pickedLocationFromProps = null }) => {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState(pickedLocationFromProps || null);
  useEffect(() => {
    if (pickedLocationFromProps) {
      setPickedLocation(pickedLocationFromProps);
    }
  }, [pickedLocationFromProps]);
  const [locationPermissionInformation, requestPermission] =
    Location.useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status ===
      Location.PermissionStatus.GRANTED
    ) {
      return true;
    }

    const permissionResult = await requestPermission();

    if (!permissionResult.granted) {
      if (permissionResult.canAskAgain) {
        Alert.alert(
          "Permission required",
          "Location permission is required to get your current location."
        );
      } else {
        Alert.alert(
          "Location access disabled",
          "Please enable location permission in Settings to use this feature.",
          [
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
            { text: "Cancel" },
          ]
        );
      }

      return false;
    }

    return true;
  }

  const getLocationHandler = async () => {
    try {
      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        Alert.alert(
          "Location services disabled",
          "Please enable location services on your device."
        );
        return;
      }

      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Finest,
      });

      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: null,
      };

      setPickedLocation(locationData);
      onLocationPicked(locationData);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error while retrieving your location.";

      Alert.alert("Error", `Failed to get location: ${message}`);
    }
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };
  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        {pickedLocation ? (
          <View style={styles.locationInfo}>
            <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
            <Text style={styles.locationText}>
              Lat: {pickedLocation.latitude.toFixed(4)}
            </Text>
            <Text style={styles.locationText}>
              Lng: {pickedLocation.longitude.toFixed(4)}
            </Text>
          </View>
        ) : (
          <Text style={styles.placeholderText}>No location selected</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={getLocationHandler}>
          <Ionicons name="location" size={24} color="#fff" />
          <Text style={styles.buttonText}>Get Location</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={pickOnMapHandler}>
          <Ionicons name="map" size={24} color="#fff" />
          <Text style={styles.buttonText}>Pick on Map</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  previewContainer: {
    flex: 1,
    marginBottom: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  locationInfo: {
    alignItems: "center",
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LocationPicker;
