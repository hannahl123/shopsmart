import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { useStyles } from "@/constants/useStyles";

export default function Index() {
  const styles = useStyles();

  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>ShopSmart</Text>
      <Text style={[styles.header, {top: '12%'}]}>SHOPPING LIST</Text>
      <View style={[styles.container, {padding: 10,
            margin: 10, top: '13%'}]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Item</Text>
          <Text style={styles.headerText}>Best Price</Text>
          <Text style={styles.headerText}>Best Deal at...</Text>
        </View>
      </View>
      <Text style={[styles.header, {top: '60%'}]}>BEST DEALS AT...</Text>
    </View>
  );
}
