import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, LogBox, Dimensions } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { color } from 'react-native-reanimated';
import { TextInput, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const WIDTH=Dimensions.get('window').width;
const HEIGHT=Dimensions.get('window').height;

type CustomBottomSheetProps = {
    item1?: string,
    item2?: string,
    item3?: string,
    item4?: string,
    item5?: string,
    item6?: string
}

const CustomBottomSheet = ({ item1, item2, item3, item4, item5, item6 }: CustomBottomSheetProps) => {

    LogBox.ignoreAllLogs();

    const bs = React.useRef(null)
    const fall = new Animated.Value(1);

    const [value, setValue] = React.useState('Select Category');

    const updateSnap = (value: string) => {
        setValue(value);
        //@ts-ignore
        bs.current.snapTo(1)
    }

    const renderHeader = () => (
        <View>
            <View style={{ flexDirection: 'row',justifyContent:'center' }}>
                <Text style={styles.headerText}>Operating System</Text>
                {/* <Icon name="floppy-o" size={30} color="#808e9b" /> */}
            </View>
            <View style={styles.panelHandle}></View>
        </View>

    )

    const renderInner = () => (
        <View style={styles.panel}>
            <RadioButton.Group onValueChange={value => updateSnap(value)} value={value}>
                {
                    item1 ? <RadioButton.Item label={item1} value={item1} /> : <></>
                }
                {
                    item2 ? <RadioButton.Item label={item2} value={item2} /> : <></>
                }
                {
                    item3 ? <RadioButton.Item label={item3} value={item3} /> : <></>
                }
                {
                    item4 ? <RadioButton.Item label={item4} value={item4} /> : <></>
                }
                {
                    item5 ? <RadioButton.Item label={item5} value={item5} /> : <></>
                }
                {
                    item6 ? <RadioButton.Item label={item6} value={item6} /> : <></>
                }
            </RadioButton.Group>
        </View>
    )

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TextInput
                    label={value}
                    mode='outlined'
                    disabled
                    //@ts-ignore
                    right={<TextInput.Icon name={"menu-down"} onPress={() => bs.current.snapTo(0)} />}
                />
            </View>
            <BottomSheet
                ref={bs}
                snapPoints={[0, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
        </View>
    )
}

export default CustomBottomSheet;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    mainContainer: {
        flex: 1,
        backgroundColor:'white'
    },
    panel: {
        padding: 20,
        backgroundColor: 'white',
        paddingTop: 20
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    panelHandle: {
        width: '100%',
        height: 1,
        backgroundColor: '#00000040',
        marginTop: 15
    },
})