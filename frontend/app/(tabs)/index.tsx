import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Modal, Image } from "react-native";
import { useStyles } from "@/constants/useStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { useExpoRouter } from "expo-router/build/global-state/router-store";

export default function Index() {
  const styles = useStyles();
  const router = useExpoRouter();

  const tableData = [
    { item: 'Apples', price: '$3.99', store: 'Walmart' },
    { item: 'Oranges', price: '$3.49', store: 'No Frills' },
    { item: 'Avocados', price: '$1.99', store: 'Walmart' },
    { item: 'Bananas', price: '$0.58', store: 'T&T' },
    { item: 'Butter', price: '$4.59', store: 'No Frills' },
    { item: 'Lettuce', price: '$1.99', store: 'No Frills' }, 
    { item: 'Grapes', price: '$4.99', store: 'T&T' },
  ];

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
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.header, {textAlign: 'center'}]}>SHOPPING LIST</Text>
        <TouchableOpacity style={{position: 'absolute', right: 20, top: 26}} onPress={() => router.push('/itemsList')}>
          <MaterialIcons
            name="edit"
            style={[styles.searchButton, { fontSize: 25}]}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.container, {
        padding: 10, margin: 10, marginTop: '5%', maxHeight: '40%'
      }]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Item</Text>
          <Text style={styles.headerText}>Best Price</Text>
          <Text style={styles.headerText}>Best Deal at...</Text>
        </View>

        <ScrollView style={{ maxHeight: '100%' }}>
          {tableData.map((row, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{row.item}</Text>
              <Text style={[styles.cell, { marginHorizontal: '0%' }]}>{row.price}</Text>
              <Text style={[styles.cell, { marginLeft: '0%' }]}>{row.store}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Text style={[styles.header, { marginTop: '10%' }]}>BEST DEALS AT...</Text>
    </View>
  );
}
