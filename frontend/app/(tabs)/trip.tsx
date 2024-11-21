import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Linking } from "react-native";
import { useStyles } from "@/constants/useStyles";
import { MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from "axios";

export default function Trip() {
  const styles = useStyles();

  const [coordinates, setCoordinates] = useState({
    origin: { latitude: 43.470770077863016, longitude: -80.5353621012697 }, // UWP
    destination: { latitude: 43.470462650905084, longitude: -80.51590856079426 }, // No Frills
    waypoints: [
      { latitude: 43.4867198698444, longitude: -80.52453781661318 }, // Walmart
    ],
  });
  const [route, setRoute] = useState<{ latitude: number; longitude: number }[]>([]);

  const fetchRoute = async () => {
    const apiKey = 'AIzaSyASaPcit5_TwPp0HYSO_3PiUpFuefL-MPo';
    const { origin, destination, waypoints } = coordinates;

    // Convert waypoints to a URL-friendly string
    const waypointString = waypoints
      .map((point) => `${point.latitude},${point.longitude}`)
      .join('|');

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=${waypointString}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.routes.length > 0) {
        const points = decodePolyline(response.data.routes[0].overview_polyline.points);
        setRoute(points);
      } else {
        console.warn('No routes found');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // Decode polyline from Directions API
  const decodePolyline = (t: string): { latitude: number; longitude: number }[] => {
    let points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < t.length) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  // Open in Google Maps
  const openInGoogleMaps = () => {
    const { origin, destination, waypoints } = coordinates;
    const waypointString = waypoints
      .map((point) => `${point.latitude},${point.longitude}`)
      .join('|');
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=${waypointString}`;
    Linking.openURL(url);
  };

  // Calculate the center between origin and destination
  const getCenterCoordinate = () => {
    const { origin, destination } = coordinates;
    const latitude = (origin.latitude + destination.latitude) / 2;
    const longitude = (origin.longitude + destination.longitude) / 2;
    return { latitude, longitude };
  };

  // Calculate zoom level (based on the distance between origin and destination)
  const getZoomLevel = () => {
    const { origin, destination } = coordinates;
    const latDiff = Math.abs(origin.latitude - destination.latitude);
    const lonDiff = Math.abs(origin.longitude - destination.longitude);
    const maxDiff = Math.max(latDiff, lonDiff);

    // Adjust zoom level based on maxDiff (distance)
    if (maxDiff < 0.1) {
      return 0.05; // High zoom (close to the points)
    } else if (maxDiff < 0.5) {
      return 0.1;
    } else {
      return 0.2; // Low zoom (farther distance)
    }
  };

  useEffect(() => {
    fetchRoute();
  }, [coordinates]);

  const customMapStyle = [
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]

  const centerCoordinate = getCenterCoordinate();
  const zoomLevel = getZoomLevel();

  return (
    <View
      style={styles.view}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.title, { position: 'relative', left: 0 }]}>ShopSmart</Text>
        <TouchableOpacity onPress={() => alert("Searching...")}>
          <MaterialIcons
            name="search"
            style={styles.searchButton}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>
        Path for Your Grocery Trip</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: centerCoordinate.latitude,
          longitude: centerCoordinate.longitude,
          latitudeDelta: zoomLevel,
          longitudeDelta: zoomLevel,
        }}
        customMapStyle={customMapStyle}
      >
        <Marker coordinate={coordinates.origin} title="Origin" description='Start' pinColor='green' />
        {coordinates.waypoints.map((point, index) => (
          <Marker key={index} coordinate={point} title={`Waypoint ${index + 1}`} pinColor='blue' />
        ))}
        <Marker coordinate={coordinates.destination} title="Destination" description='End' pinColor='red' />
        {route.length > 0 && (<Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />)}
      </MapView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
        <TouchableOpacity style={[styles.button, { marginLeft: 0 }]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginRight: 0 }]} onPress={openInGoogleMaps}>
          <Text style={styles.buttonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.header, { marginTop: '8%' }]}>
        Optimize Your Trip!</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
        <Text style={[styles.optionText, { marginTop: '2%' }]}>Upper price range ($): </Text>
        <TextInput style={styles.input}></TextInput>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
        <Text style={[styles.label, { marginTop: '2%' }]}>Priority:</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginRight: 0 }]}>
          <Text style={styles.buttonText}>Auto</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}
