import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../constants/Colors";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          height: '12%', 
          paddingTop: '3%', 
          marginBottom: '4%',
          marginHorizontal: '5%', 
          borderTopWidth: 1,
          borderColor: Colors.light.background,
        },
        tabBarLabelStyle: {
          paddingTop: '3%',
          fontSize: 13, 
          fontWeight: 500,
        }, 
        tabBarIconStyle: {
          paddingBottom: '3%',
        },
        tabBarActiveTintColor: Colors.light.background, 
        tabBarInactiveTintColor: Colors.light.text, 
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          title: 'HOME',
          tabBarIcon: ({focused}) => (
            <MaterialIcons 
              name={'home'} 
              color={focused ? Colors.light.background : '#1E6091'} 
              size={35}
            />
          ), 
        }}
      />
      <Tabs.Screen
        name="trip" 
        options={{
          title: 'TRIP',
          tabBarIcon: ({focused}) => (
            <MaterialIcons 
              name={'schedule'} 
              color={focused ? Colors.light.background : '#1E6091'} 
              size={35}
            />
          )
        }}
      />
      <Tabs.Screen
        name="account" 
        options={{
          title: "ACCOUNT", 
          tabBarIcon: ({focused}) => (
            <MaterialIcons 
              name={'search'} 
              color={focused ? Colors.light.background : '#1E6091'} 
              size={35}
            />
          ),
        }}
      />
    </Tabs>
  );
}
