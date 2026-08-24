import React from "react";
import PlaceForm from "../components/Places/PlaceForm";

const AddPlace = ({ route }) => {
  const pickedLocation = route?.params?.pickedLocation || null;
  return <PlaceForm initialPickedLocation={pickedLocation} />;
};

export default AddPlace;
