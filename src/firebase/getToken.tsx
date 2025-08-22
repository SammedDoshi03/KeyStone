import firestore from '@react-native-firebase/firestore';


const getToken =async (email:string) => {

    const snapshot = await firestore().collection('employee').where('email', '==', `${email}`).get();
    
    //@ts-ignore
    if(snapshot.docs[0]._data.token != undefined){
        //@ts-ignore
        return snapshot.docs[0]._data.token
    } else '';
}

export default getToken