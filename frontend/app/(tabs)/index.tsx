import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    Image,
} from "react-native";
import { useStyles } from "@/constants/useStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useExpoRouter } from "expo-router/build/global-state/router-store";

import { getShoppingList } from "@/lib/api";
import { ShoppingItem } from "@/constants/types";

export default function Index() {
    const styles = useStyles();
    const router = useExpoRouter();

    // const tableData = [
    //     { item: "Pasta", price: "$3.99", store: "Walmart" },
    //     { item: "Oranges", price: "$3.49", store: "Nofrills" },
    //     { item: "Lettuce", price: "$1.99", store: "Walmart" },
    //     { item: "Bananas", price: "$0.58", store: "T&T" },
    //     { item: "Butter", price: "$4.59", store: "Sobeys" },
    // ];

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState<ShoppingItem[]>([]);
    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredData(tableData); // Reset to original data if the query is empty
        } else {
            const filtered = tableData.filter(item =>
                item.item.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    const [tableData, setTableData] = useState<ShoppingItem[]>([]);

    useEffect(() => {
        getShoppingList(2).then(data => {
            console.log(`shopping list: ${JSON.stringify(data)}`);
            setTableData(data);
            setFilteredData(data);
        });
    }, []);

    return (
        <View style={styles.view}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                <Text style={[styles.title, { position: "relative", left: 0 }]}>
                    ShopSmart
                </Text>
                <TouchableOpacity onPress={() => alert("Searching...")}>
                    <MaterialIcons name="search" style={styles.searchButton} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text style={[styles.header, { textAlign: "center" }]}>
                    SHOPPING LIST
                </Text>
                <TouchableOpacity
                    style={{ position: "absolute", right: 20, top: 26 }}
                    onPress={() => router.push("/itemsList")}>
                    <MaterialIcons
                        name="edit"
                        style={[styles.searchButton, { fontSize: 25 }]}
                    />
                </TouchableOpacity>
            </View>

            <View
                style={[
                    styles.container,
                    {
                        padding: 10,
                        margin: 10,
                        marginTop: "5%",
                        maxHeight: "40%",
                    },
                ]}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Item</Text>
                    <Text style={styles.headerText}>Best Price</Text>
                    <Text style={styles.headerText}>Best Deal at...</Text>
                </View>

                <ScrollView style={{ maxHeight: "100%" }}>
                    {tableData.map((row, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.cell}>{row.item}</Text>
                            <Text
                                style={[
                                    styles.cell,
                                    { marginHorizontal: "0%" },
                                ]}>
                                {row.price}
                            </Text>
                            <Text style={[styles.cell, { marginLeft: "0%" }]}>
                                {row.store}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <Text style={[styles.header, { marginTop: "5%" }]}>
                BEST DEALS AT...
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "10%",
                }}>
                <TouchableOpacity
                    style={styles.iconBox}
                    onPress={() => router.push("walmart")}>
                    <Image
                        source={require("./walmart.jpeg")}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconBox}
                    onPress={() => router.push("nofrills")}>
                    <Image
                        source={require("./nofrills.jpeg")}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconBox}
                    onPress={() => router.push("tnt")}>
                    <Image source={require("./tnt.png")} style={styles.image} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
