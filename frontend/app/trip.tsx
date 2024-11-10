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
      <Text style={[styles.header, {top: '73%'}]}>
        Optimize Your Trip!</Text>
    </View>
  );
}
