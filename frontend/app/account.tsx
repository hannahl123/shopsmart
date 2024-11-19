import React from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { useStyles } from "@/constants/useStyles";
import { Colors } from "../constants/Colors";

export default function Account() {
  const styles = useStyles();

  return (
    <View style={styles.view}>

      <Text style={styles.title}>ShopSmart</Text>
      <Text style={styles.header}>Your Account</Text>
      <Text style={[styles.optionText, { marginTop: '15%' }]}>Email:</Text>
      <Text style={[styles.input, { width: '100%', marginTop: '5%' }]}> * Email address * </Text>
      <View style={{marginTop: '15%'}}>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={[styles.buttonText, {textAlign: 'center'}]}>Trip History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={[styles.buttonText, {textAlign: 'center'}]}>Items List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={[styles.buttonText, {textAlign: 'center'}]}>Log Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
