import { View, Text } from "react-native";
import React from "react";
import PlacesList from "../components/Places/PlacesList";

const AllPlaces = () => {
  return (
    <PlacesList
      places={[
        { id: "1", title: "Place 1" },
        { id: "2", title: "Place 2" },
      ]}
    />
  );
};

export default AllPlaces;
