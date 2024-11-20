import React from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { useStyles } from "@/constants/useStyles";
import { Colors } from "../../constants/Colors";
import { useExpoRouter } from "expo-router/build/global-state/router-store";

export default function Account() {

  const styles = useStyles();
  const router = useExpoRouter();

  return (
    <View style={styles.view}>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, {position: 'relative', left: 0}]}>ShopSmart</Text>
        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.buttonText, {marginTop: '5%'}]}>Add Item</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Your Account</Text>
      <Text style={[styles.optionText, { marginTop: '10%' }]}>Email:</Text>
      <Text style={[styles.input, { width: '100%', marginTop: '5%' }]}> * Email address * </Text>
      <View style={{marginTop: '15%'}}>
        <TouchableOpacity style={styles.accountButton} onPress={() => router.push('/trip')}>
          <Text style={[styles.buttonText, {textAlign: 'center'}]}>Trip History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton} onPress={() => router.push('/itemsList')}>
          <Text style={[styles.buttonText, {textAlign: 'center'}]}>Items List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton} onPress={() => router.push('/logout')}>
          <Text style={[styles.buttonText, {textAlign: 'center'}]}>Log Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
