import { useStyles } from '@/constants/useStyles';
import React, {useState} from 'react';
import {View, Text, useColorScheme, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ItemsList() {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Date Added (Newest to Oldest)', value: 'dateadded1' },
        { label: 'Date Added (Oldest to Newest)', value: 'dateadded2' },
        { label: 'Alphabetical (Ascending)', value: 'alpha1' },
        { label: 'Alphabetical (Descending)', value: 'alpha2' },
    ]);

    return (
        <View style={styles.view}>
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
                    dropDownContainerStyle={styles.dropdownContainer}
                />
            </View>

            <View style={{width: '95%', borderColor: Colors.light.text, borderWidth: 1, height: '40%', marginTop: '5%', borderRadius: 8, marginHorizontal: 'auto'}}>

            </View>
        </View>
    )
}
