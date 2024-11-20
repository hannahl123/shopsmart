import { useStyles } from '@/constants/useStyles';
import React, {useState} from 'react';
import {View, Text, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from "@expo/vector-icons";

export default function ItemsList() {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Date Added (Most Recent)', value: 'dateadded1' },
        { label: 'Date Added (Oldest)', value: 'dateadded2' },
        { label: 'Alphabetical (Ascending)', value: 'alpha1' },
        { label: 'Alphabetical (Descending)', value: 'alpha2' },
    ]);

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const [tableData, setTableData] = useState([
        {item: 'Apples', date: '2024-11-19', select: 'Select' },
        {item: 'Oranges', date: '2024-11-18', select: 'Select' },
        {item: 'Avocados', date: '2024-11-17', select: 'Select' },
        {item: 'Bananas', date: '2024-11-16', select: 'Select' },
        {item: 'Butter', date: '2024-11-16', select: 'Select' },
    ]);

    const toggleSelection = (index: number) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const removeSelectedItems = () => {
        setTableData(tableData.filter((_, index) => !selectedRows.includes(index)));
        setSelectedRows([]); // Clear selection after removal
    };

    const clearAllItems = () => {
        setTableData([]);
        setSelectedRows([]);
    };

    return (
        <View style={styles.view}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.title, {position: 'relative', left: 0}]}>ShopSmart</Text>
                <TouchableOpacity style={[styles.button]}>
                <Text style={[styles.buttonText, {marginTop: '5%'}]}>Add Item</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.header, {fontWeight: 'bold', fontSize: 25, marginBottom: '5%'}]}>YOUR ITEMS</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.header, {marginTop: '10%'}]}>Sort By: </Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select an Option"
                    style={styles.dropdown} 
                    textStyle={{color: Colors.light.text}}
                    dropDownContainerStyle={styles.dropdownContainer}
                />
            </View>

            <View style={[styles.container, {padding: 10,
                marginHorizontal: 0, marginTop: '5%', marginBottom: '5%', height: '50%'}]}>
              <View style={styles.headerRow}>
                <Text style={styles.headerText}>Item</Text>
                <Text style={[styles.headerText, {marginLeft: '-10%'}]}>Date Added</Text>
                <Text style={[styles.headerText, {marginRight: '-22%'}]}>Select</Text>
              </View>

              <ScrollView style={{maxHeight: '100%'}}>
                {tableData.map((row, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{row.item}</Text>
                        <Text style={[styles.cell, {marginLeft: '-10%'}]}>{row.date}</Text>
                        <TouchableOpacity 
                            style={[styles.selectButton, {marginRight: '7%'}]} 
                            onPress={() => toggleSelection(index)}
                        >
                            <MaterialIcons 
                                name={selectedRows.includes(index) ? 'check-box' : 'check-box-outline-blank'} 
                                size={24} 
                                color={Colors.light.background} 
                            />
                        </TouchableOpacity>
                    </View>
                ))}
                </ScrollView>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.button} onPress={removeSelectedItems}>
              <Text style={styles.buttonText}>Remove Selected</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={clearAllItems}>
              <Text style={styles.buttonText}>Delete All</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}
