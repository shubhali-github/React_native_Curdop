import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    width: "70%",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    height: 28,
    alignItems: "center",
    width: "30%",
    backgroundColor: "#009387",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
  },
  buttons: {
    height: 28,
    alignItems: "center",
    width: "65%",
    backgroundColor: "#808080",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
  },
  containers: {
    flex: 1,
    flexDirection: "row",
    // display: "block",
    borderRadius: 3,
    justifyContent: "center",
    backgroundColor: "#808080",
  },
  buttonContainer: {
    flex: 1,
    margin: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
