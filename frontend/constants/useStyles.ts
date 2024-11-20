import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { Colors } from "./Colors";

export const useStyles = () => {

    return StyleSheet.create({
        view : {
            flex: 1,
            backgroundColor: '#fff',
            padding: '10%', 
        }, 
        title: {
            fontSize: 30,
            fontWeight: 'bold', 
            color: Colors.light.text, 
            position: 'absolute', 
            top: '8%',
            left: '13%',
        }, 
        header: {
            fontSize: 18, 
            fontWeight: 'semibold', 
            color: Colors.light.text, 
            textAlign: 'center', 
            marginTop: '25%',
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
            borderBottomColor: Colors.light.background,
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
        accountButton: {
            borderWidth: 1, 
            borderColor: Colors.light.text, 
            borderRadius: 8, 
            paddingVertical: '4%', 
            marginVertical: '5%', 
        }, 
        buttonText: {
            fontSize: 16,
            color: '#0077B6',
        },
        input: {
            borderWidth: 1, 
            borderColor: Colors.light.text,
            borderRadius: 8, 
            width: '35%',
            alignSelf: 'flex-end',
            padding: 5,
        }, 
        dropdown: {
            borderColor: Colors.light.text,
            color: Colors.light.text,
            width: '72%',
            marginLeft: '5%',
            marginTop: '5%',
            padding: '2%',
        }, 
        dropdownContainer: {
            width: '70%',
            color: Colors.light.text,
            borderColor: Colors.light.text,
            marginLeft: '5%',
            marginTop: '5%',
        }, 
        cell: {
            flex: 1,
            paddingTop: '3%', 
            paddingHorizontal: '1%', 
            textAlign: 'left',
            color: Colors.light.text,
        }, 
        selectButton: {
            color: Colors.light.text, 
            paddingVertical: '2%',
            paddingHorizontal: '2%',
            borderRadius: 10,
        }, 
        selectButtonText: {
            color: Colors.light.text,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: Colors.light.background, 
        }, 
        searchButton: {
            fontSize: 20, 
            color: Colors.light.text, 
            textAlign: 'right', 
            paddingHorizontal: '2%',
        }, 
        searchBar: {
            borderWidth: 1, 
            borderColor: Colors.light.text, 
            borderRadius: 8, 
            padding: '2.5%', 
            paddingLeft: '4%', 
            height: '6%', 
            marginVertical: '10%', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 

        }, 
        searchInput: {
            color: Colors.light.text, 
        }
    })
}