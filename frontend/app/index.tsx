import React from 'react';
import { Text, View } from "react-native";
import { useStyles } from "@/constants/useStyles";

export default function Index() {
  const styles = useStyles();

  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>SHOPSMART</Text>
      <Text style={styles.header}>SHOPPING LIST</Text>

    </View>
  );
}
