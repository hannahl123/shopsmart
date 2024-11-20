import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useStyles } from "@/constants/useStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function Index() {
  const styles = useStyles();

  const tableData = [
    {item: 'Pasta', price: '$3.99', store: 'Walmart' },
    {item: 'Oranges', price: '$3.49', store: 'Nofrills' },
    {item: 'Lettuce', price: '$1.99', store: 'Walmart' },
    {item: 'Bananas', price: '$0.58', store: 'T&T' },
    {item: 'Butter', price: '$4.59', store: 'Sobeys' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredData(tableData); // Reset to original data if the query is empty
    } else {
      const filtered = tableData.filter((item) =>
        item.item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View
      style={styles.view}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, {position: 'relative', left: 0}]}>ShopSmart</Text>
        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.buttonText, {marginTop: '5%'}]}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => alert("Searching...")}>
          <MaterialIcons 
            name="search"
            style={styles.searchButton}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.header, {marginTop: '0%'}]}>SHOPPING LIST</Text>
      <View style={[styles.container, {padding: 10,
            margin: 10, marginTop: '5%'}]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Item</Text>
          <Text style={styles.headerText}>Best Price</Text>
          <Text style={styles.headerText}>Best Deal at...</Text>
        </View>

        <ScrollView style={{maxHeight: '100%'}}>
          {tableData.map((row, index) => (
            <View key={index} style={styles.row}>
                <Text style={styles.cell}>{row.item}</Text>
                <Text style={[styles.cell, {marginHorizontal: '0%'}]}>{row.price}</Text>
                <Text style={[styles.cell, {marginLeft: '0%'}]}>{row.store}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Text style={[styles.header, {marginTop: '10%'}]}>BEST DEALS AT...</Text>
    </View>
  );
}
