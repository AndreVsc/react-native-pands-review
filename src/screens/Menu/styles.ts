import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F1F1",
        justifyContent: "center",
        padding: 40,
    },
    containerNavbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerTittle: {
        marginBottom: 20,
    },
    containerInfo: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        color: "#617CA6",
    },
    containerScroll: {
        marginTop: 20,
    },
    textError: {
        color: "#FF0000",
        marginBottom: 5,
    },
});