import { Text, View, TouchableOpacity, TextInput, Modal } from "react-native";
import { useStyles } from "@/constants/useStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function Trip() {
  const styles = useStyles();
  
  return (
    <View
      style={styles.view}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.title, {position: 'relative', left: 0}]}>ShopSmart</Text>
        <TouchableOpacity onPress={() => alert("Searching...")}>
          <MaterialIcons 
            name="search"
            style={styles.searchButton}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>
        Path for Your Grocery Trip</Text>

      <View style={[styles.container,{marginTop: '5%', marginHorizontal: '0%', height: '40%'}]}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%'}}>
        <TouchableOpacity style={[styles.button, {marginLeft: 0}]}>
         <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {marginRight: 0}]}>
         <Text style={styles.buttonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.header, {marginTop: '8%'}]}>
        Optimize Your Trip!</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%'}}>
          <Text style={[styles.optionText,{marginTop: '2%'}]}>Upper price range ($): </Text>
          <TextInput style={styles.input}></TextInput>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%'}}>
          <Text style={styles.label}>Priority:</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {marginRight: 0}]}>
            <Text style={styles.buttonText}>Auto</Text>
          </TouchableOpacity>
        </View>

        
    </View>
  );
}
