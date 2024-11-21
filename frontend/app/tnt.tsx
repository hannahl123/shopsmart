import { useStyles } from '@/constants/useStyles';
import React, { useState } from 'react';
import { View, Text, useColorScheme, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

export default function TNT() {
    const styles = useStyles();
    const router = useRouter();

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const [tableData, setTableData] = useState([
        { item: 'Pasta', price: '$3.99' },
        { item: 'Lettuce', price: '$1.99' },
    ]);

    const toggleSelection = (index: number) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    // Adding item
    const [modalVisible, setModalVisible] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [newItemDate, setNewItemDate] = useState('');

    return (
        <View style={styles.view}>
            <View style={{ flexDirection: 'row' }}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => router.push('/')} style={{ marginTop: 0, marginLeft: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MaterialIcons name="arrow-back" size={24} color={Colors.light.text} style={{marginTop: '3%'}}/>
                    <Text style={[styles.buttonText, {marginTop: '3%', marginHorizontal: '2%', fontSize: 20}]}>Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.header, { fontWeight: 'bold', fontSize: 25 }]}>T&T</Text>

            <Text style={[styles.header, { marginTop: '5%', justifyContent: 'center' }]}>Items Wanted at T&T</Text>
            <View style={[styles.container, {
                padding: 10,
                margin: 10, marginTop: '5%'
            }]}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Item</Text>
                    <Text style={styles.headerText}>Best Price</Text>
                </View>

                <ScrollView style={{ maxHeight: '100%' }}>
                    {tableData.map((row, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.cell}>{row.item}</Text>
                            <Text style={[styles.cell, { marginHorizontal: '0%' }]}>{row.price}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <Text style={[styles.header, { marginTop: '5%', justifyContent: 'center' }]}>Top Deals at T&T</Text>
            <View style={[styles.container, {
                padding: 10,
                margin: 10, marginTop: '5%'
            }]}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Item</Text>
                    <Text style={styles.headerText}>Best Price</Text>
                </View>

                <ScrollView style={{ maxHeight: '100%' }}>
                    {tableData.map((row, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.cell}>{row.item}</Text>
                            <Text style={[styles.cell, { marginHorizontal: '0%' }]}>{row.price}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}
