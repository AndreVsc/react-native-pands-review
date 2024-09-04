import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    padding: 40
  },
  containerTittle:{
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
  },
  containerInfo:{
    marginBottom: 10,
    gap:5,
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
  },
  containerLink:{
    flexDirection: "row",
    width:"100%",
    marginBottom:20,
  },
  link:{
    color: "#85A0E3",
    textAlignVertical: "bottom",
    fontWeight: "600", 
  },
  text:{
    color: "#BDBDBD",
    fontWeight: "600",
  },
});