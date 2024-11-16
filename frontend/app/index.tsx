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
      <Text style={[styles.header, {marginTop: '20%'}]}>SHOPPING LIST</Text>
      <View style={[styles.container, {padding: 10,
            margin: 10, marginTop: '5%'}]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Item</Text>
          <Text style={styles.headerText}>Best Price</Text>
          <Text style={styles.headerText}>Best Deal at...</Text>
        </View>
      </View>
      <Text style={[styles.header, {marginTop: '60%'}]}>BEST DEALS AT...</Text>
    </View>
  );
}
