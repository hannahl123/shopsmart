import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          marginTop: 15,
          marginBottom: 15, 
          marginHorizontal: 10,
          height: '10%',
        }, 
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          title: 'HOME'
        }}
      />

      <Tabs.Screen 
        name="trip" 
        options={{
          title: 'TRIP'
        }}
      />

    </Tabs>
  );
}
