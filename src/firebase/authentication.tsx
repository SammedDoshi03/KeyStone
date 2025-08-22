import auth, { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';


export const userLogin = async (email: string, password: string) => {
    let flag = false;
    let res: any[] = [];
    const err = await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => { flag = true; })
        .catch(error => {
            if (error.code == 'auth/user-not-found' || error.code === 'auth/invalid-email') {
                return ("Wrong Email");
            }
            else if (error.code === 'auth/wrong-password') {
                return ('Wrong Password');
            }
            else {
                Alert.alert(error.message);
                console.log(error)
            }
        });


    if (flag) {
        const user = await firebase.auth().currentUser;
        //@ts-ignore
        const id = user.uid
        const data = await firestore().collection('employee').doc(id).get();
        res.push(flag);
        //@ts-ignore
        res.push(data._data.accountType)
        //@ts-ignore
        res.push(data._data.location)
        //@ts-ignore
        res.push(data._data.active)

        // Register the device with FCM
        await messaging().registerDeviceForRemoteMessages();
        // Get the token
        const token = await messaging().getToken();
        //@ts-ignore
        await firestore().collection('employee').doc(id).update({
            token: token
        });
    }
    if (err) {
        res.push(err);
    }
    return res;
}

export const passUpdate = async (password: string) => {

    const user = await auth().currentUser;
    //@ts-ignore
    await user.updatePassword(password);
    //@ts-ignore
    const data = await firestore().collection('employee').doc(user.uid).update({
        active: true
    });

}

export const logOut = async () => {
    await auth().signOut()
    await remoteConfig().fetch(60);
    return true
}

