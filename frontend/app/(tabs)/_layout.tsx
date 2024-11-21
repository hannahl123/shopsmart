import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          height: '11%', 
          paddingTop: '3%', 
          paddingBottom: '3%',
          borderTopWidth: 1,
          borderColor: Colors.light.background,
        },
        tabBarLabelStyle: {
          paddingVertical: '3%',
          fontSize: 13, 
          fontWeight: 500,
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
              size={25}
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
              name={'mode-of-travel'} 
              color={focused ? Colors.light.background : '#1E6091'} 
              size={25}
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
              size={25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="itemsList" 
        options={{
          title: "YOUR ITEMS", 
        }}
      />
      <Tabs.Screen 
        name="walmart" 
        options={{
          title: "WALMART"
        }}
      />
      <Tabs.Screen 
        name="nofrills"
        options={{
          title: "NOFRILLS"
        }}
      />
      <Tabs.Screen 
        name="tnt"
        options={{
          title: "TNT"
        }}
      />
    </Tabs>
  );
}
