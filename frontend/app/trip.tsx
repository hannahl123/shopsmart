import { Text, View } from "react-native";
import { useStyles } from "@/constants/useStyles";

export default function Trip() {
  const styles = useStyles();
  
  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>ShopSmart</Text>
      <Text style={[styles.header, {top: '12%'}]}>
        Path for Your Grocery Trip</Text>
      <View style={[styles.container,{top: '15%',
        padding: 100, margin: 10,}]}>
      </View>
      <Text style={[styles.header, {marginTop: '45%'}]}>
        Optimize Your Trip!</Text>
      <Text style={[styles.optionText,{top: '7%'}]}>
        Upper price range:</Text>
      <Text style={[styles.optionText,{top: '13%'}]}>
        Priority:</Text>
      <Text style={[styles.optionText,{left: '60%', bottom: '1%', fontSize: 18}]}>$</Text>
      <View style={[styles.container, {borderColor: '#0077B6', padding: 15,
            margin: 95, bottom: '26%', left: '35%'}]}></View>
    </View>
  );
}
