import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { Colors } from "./Colors";

export const useStyles = () => {

    return StyleSheet.create({
        view : {
            flex: 1,
            //justifyContent: "center",
            //alignItems: "center",
            backgroundColor: '#fff',
            padding: '10%', 
        }, 
        title: {
            fontSize: 30,
            fontWeight: 'bold', 
            color: Colors.light.text, 
            position: 'absolute', 
            top: '8%',
            left: '8%',
        }, 
        header: {
            fontSize: 18, 
            fontWeight: 'semibold', 
            color: Colors.light.text, 
            textAlign: 'center', 
        }, 
        video: {
            width: '100%', 
            height: 200, 
        }, 
        rect: {
            borderColor: Colors.light.background, 
            borderWidth: 1.5, 
            width: '90%', 
            paddingHorizontal: '7%', 
            paddingVertical: '7%', 
            marginVertical: '5%', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
        }, 
        optionText: {
            fontSize: 16, 
            fontWeight: 'semibold', 
            color: Colors.light.text,
        }, 
        settings_icon: {
            color: Colors.light.text,
            marginTop: -4,
            fontSize: 24, 
        },
        container: {
            borderWidth: 1,
            borderColor: '#56B4D3',
            borderRadius: 8,
            padding: 10,
            margin: 10,
        },
        headerRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#56B4D3',
            paddingBottom: 5,
            marginBottom: 5,
        },
        headerText: {
            flex: 1,
            fontWeight: 'bold',
            color: '#56B4D3',
            fontSize: 12,
        },
        line: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
        },
        label: {
            fontSize: 16,
            color: '#0077B6',
            marginRight: 10,
        },
        button: {
            borderWidth: 1,
            borderColor: '#0077B6',
            borderRadius: 8,
            paddingVertical: 5,
            paddingHorizontal: 15,
            marginHorizontal: 5,
        },
        buttonText: {
            fontSize: 16,
            color: '#0077B6',
        },
    })
}