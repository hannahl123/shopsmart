import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useStyles } from "@/constants/useStyles";

export default function Trip() {
  const styles = useStyles();
  
  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>ShopSmart</Text>
      <Text style={styles.header}>
        Path for Your Grocery Trip</Text>
      <View style={[styles.container,{marginTop: '10%', marginHorizontal: '0%', height: '40%'}]}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%'}}>
        <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.header, {marginTop: '8%'}]}>
        Optimize Your Trip!</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: '8%', marginTop: '5%'}}>
          <Text style={[styles.optionText,{marginTop: '2%'}]}>Upper price range ($): </Text>
          <TextInput style={styles.input}></TextInput>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.label}>Priority:</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Auto</Text>
          </TouchableOpacity>
        </View>
        
    </View>
  );
}
