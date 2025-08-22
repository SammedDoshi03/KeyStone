import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { RadioButton, TextInput } from 'react-native-paper';

type CustomCategoryModalProps = {
    title: string,
    items: any[],
    categoryPath: string,
    listKey: any,
    updateCategoryPath: (value: string) => void,
    updateListKey: (value: any) => void,
}
const CustomCategoryModal = ({ title, items, categoryPath, updateListKey, updateCategoryPath, listKey }: CustomCategoryModalProps) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState('Select...');
    const [categoryHead, setCategoryHead] = useState('');
    console.log('catPath', categoryPath);
    console.log('val', value);
    console.log('items', items, listKey);
    const updateSnap = (value: string) => {
        setValue(value);
        setModalVisible((prev) => !prev)
    }
    const items2 = items[listKey]
    console.log('items2',items2)

    return (
        (items2)?
        <View style={styles.container}>
            <TextInput
                placeholder={value}
                placeholderTextColor="black"
                mode='outlined'
                disabled
                right={<TextInput.Icon name={"menu-down"} onPress={() => {
                    setModalVisible((prev) => !prev)
                }} />}
            />
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={[styles.centeredView]}>
                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold',color:'grey' }}>{title}</Text>
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 4 }}
                                    onPress={() => {
                                        setModalVisible((prev) => !prev)
                                    }}
                                >
                                    <Icon name="x" size={30} color="#000000" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.panelHandle}></View>
                            <View>
                                <RadioButton.Group onValueChange={value => {
                                    const str = categoryPath.split('/');
                                    //@ts-ignore
                                    if (str.length == (2 * listKey) + 1) {
                                        //@ts-ignore
                                        updateCategoryPath(categoryPath + '/' + value.key);
                                    }
                                    else {
                                        let temp = str;
                                        if (listKey === 0) {
                                            temp.length = listKey + 1;
                                        }
                                        else {
                                            temp.length = listKey + 2;
                                        }
                                        const res = temp.join('/');
                                        console.log('modal res = ', res)
                                        //@ts-ignore
                                        updateCategoryPath(res + '/' + value.key);
                                    }
                                  
                                    //@ts-ignore
                                    updateSnap(value.key);
                                    updateListKey(listKey);
                                }}
                                    value={value}>
                                    {
                                        items2.map(item => (
                                            (item.value.count > 0 && item.value.display_view_all) ? <RadioButton.Item label={item.key} value={item} /> : <></>
                                        ))
                                    }
                                </RadioButton.Group>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
        :<></>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingLeft:20,
        paddingRight:20
    },
    centeredView: {
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 350,
    },
    panelHandle: {
        width: '100%',
        height: 2,
        backgroundColor: 'grey',
        marginTop: 15
    },
})

export default CustomCategoryModal;