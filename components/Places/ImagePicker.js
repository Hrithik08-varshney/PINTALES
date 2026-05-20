import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import * as ExpoImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/color'
import IconButton from '../UI/IconButton'

const ImagePicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = React.useState(null)

  const verifyPermissions = async () => {
    const { status } = await ExpoImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.'
      )
      return false
    }
    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }

    try {
      const image = await ExpoImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      })

      if (!image.canceled) {
        setPickedImage(image.assets[0].uri)
        onImageTaken(image.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take image')
    }
  }

  const pickFromGalleryHandler = async () => {
    try {
      const image = await ExpoImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      })

      if (!image.canceled) {
        setPickedImage(image.assets[0].uri)
        onImageTaken(image.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedImage ? (
          <Text style={styles.previewText}>No image selected yet</Text>
        ) : (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={takeImageHandler}
          activeOpacity={0.7}
        >
          <Ionicons name="camera" size={24} color="#fff" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={pickFromGalleryHandler}
          activeOpacity={0.7}
        >
          <Ionicons name="image" size={24} color="#fff" />
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  previewText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.accent,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
})

export default ImagePicker