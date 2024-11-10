import React from 'react';
import { Text, View, Button } from 'react-native';
import { useStyles } from "@/constants/useStyles";
import { Colors } from "../constants/Colors";

export default function Account() {
    const styles = useStyles();
  
    return (
      <View
        style={styles.view}
      >
        <Text style={styles.title}>ShopSmart</Text>
        <Text style={[styles.header, {top: '18%'}]}>Your Acount</Text>
        <Text style={[styles.optionText,{top: '25%'}]}>Email:</Text>
      </View>
    );
  }
  