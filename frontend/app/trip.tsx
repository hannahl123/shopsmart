import { Text, View, TouchableOpacity } from "react-native";
import { useStyles } from "@/constants/useStyles";

export default function Trip() {
  const styles = useStyles();
  
  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>ShopSmart</Text>
      <Text style={[styles.header, {marginTop: '20%'}]}>
        Path for Your Grocery Trip</Text>
      <View style={[styles.container,{marginTop: '10%',
        padding: 100, margin: 10,}]}></View>
      <View style={styles.line}>
        <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.header, {marginTop: '5%'}]}>
        Optimize Your Trip!</Text>
      <Text style={[styles.optionText,{marginTop: '10%'}]}>
        Upper price range:            $</Text>
      <View style={[styles.line,{top: '5%'}]}>
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
      <View style={[styles.container,{borderColor: '#0077B6', padding: 13,
            margin: 98, bottom: '35%', left: '35%'}]}></View>
    </View>
  );
}
