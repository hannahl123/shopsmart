import React from 'react';
import { Text, View } from "react-native";
import { useStyles } from "@/constants/useStyles";

export default function Index() {
  const styles = useStyles();

  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>DOORSENSE</Text>
      <Text style={styles.header}>LIVE</Text>

    </View>
  );
}
