import { View, Text, FlatList } from 'react-native'
import React from 'react'

const PlacesList = ({places}) => {
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  )
}

export default PlacesList