import React from 'react';
import { Text, View } from "react-native";
import { useStyles } from "@/constants/useStyles";

export default function Index() {
  const styles = useStyles();

  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>ShopSmart</Text>
      <Text style={[styles.header, {top: '12%'}]}>SHOPPING LIST</Text>
      <Text style={[styles.header, {top: '60%'}]}>BEST DEALS AT...</Text>
    </View>
  );
}
