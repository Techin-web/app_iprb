import { StyleSheet } from 'react-native';
import defaultStyle from '../defaultStyle';

const styles = StyleSheet.create({
    ...defaultStyle,
    contentContainer: {
        justifyContent: 'space-between',
        height: '100%'
    },
    button: {
        justifyContent: 'space-between',
        height: 70,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: '#4055B3',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.0
    },
    buttonSelected: {
        backgroundColor: '#4055B3'
    },
    textSelected: {
        color: 'white'
    },
    align: {
        alignItems: 'center'
    },
    text: {
        color: 'white'
    },
    container: {
        padding: 20
    },
    containerOptions: {
        marginTop: 20
    },
    contentEvenly: {
        justifyContent: 'space-evenly',
        borderBottomWidth: 0
    },
    checkbokItemLabel: {
        justifyContent: 'center',
        borderBottomWidth: 0
    },
    noBorder: {
        borderBottomWidth: 0
    },
    textButton: {
        color: '#4055B3'
    },
    checkbox: {
        marginRight: 15
    },
    groupFields: {
        margin: 0,
        padding: 0
    },
    chooseInsuranceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 22
    },
    chooseInsuranceItem: {
        flexDirection: 'row',
        marginTop: 13
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#5A74EB",
        borderRadius: 4,
        padding: 10,
        width: 250,
        elevation: 2,
        marginBottom: 10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default styles;
