import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    padding: 40,
  },
  containerTittle: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
  },
  containerInfo: {
    marginBottom: 10,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
  },
  textError: {
    color: "#B67A7A",
    fontSize: 12,
    marginLeft: 5,
    justifyContent:"flex-end",
    alignSelf:"flex-start",
    fontWeight: "600",
  },
});