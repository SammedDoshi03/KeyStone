import auth, { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const userFetch = async () => {

    const user = await firebase.auth().currentUser;
    //@ts-ignore
    const data = await firestore().collection('employee').doc(user.uid).get();
    return data;
}

export const userIdFetch = async () => {
    const user = await firebase.auth().currentUser;
    return user?.uid;
}


export default userFetch;
