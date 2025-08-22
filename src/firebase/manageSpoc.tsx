import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { sendNotifcation } from './sendNotification';

const manageSPOC = async () =>  {

    let location = "Mumbai";
    auth()
    .signInWithEmailAndPassword("josh@gmail.com", "josh@1234")
    .then(() => {
      })
    .catch(error => {
        
        Alert.alert(error.message);
    });
    
    return filterByLocation(location);
}

export const filterByLocation = async (location: string)  => {
    location = location[0].toUpperCase() + location.substring(1);
    const spocDetails = await firestore()
                                .collection('employee')
                                .where('accountType', '==', 'spoc')
                                .where('location', '==', `${location}`)
                                .get()
    let dataList: any[] = [];
        spocDetails.forEach(doc => {
            dataList.push(doc.data());
        });
        if(dataList.length<=0) {
            return null;
        } else {
            return dataList;
        }
}

export const getSPOC =async (email:string) => {
    const snapshot = await firestore()
                            .collection('employee')
                            .where('accountType', '==', 'spoc')
                            .where('email', '==', `${email}`)
                            .get();
    let dataList: any[] = [];
    snapshot.forEach(doc => {
        dataList.push(doc.data());
    });
    if(dataList.length<=0) {
        return null;
    } else {
        return dataList;
    }
}

export const getSPOCAmount = async () => {
    const snapshot = await firestore()
                            .collection('employee')
                            .where('accountType', '==', 'spoc')
                            .get();
    let dataList: any[] = [];
    snapshot.forEach(doc => {
        dataList.push(doc.data());
    });
    if(dataList.length<=0) {
        return null;
    } else {
        return dataList.length;
    }
}


export const updateSPOC =async (email:string, endDate:Date) => {
    const snapshot = await firestore()
                            .collection('employee')
                            .where('accountType', '==', 'spoc')
                            .where('email', '==', `${email}`)
                            .get();
    if (snapshot.empty) {
      return "No matching documents.";
    }  
    let id;
    snapshot.forEach(doc => {id = doc.id});

    await firestore().collection('employee').doc(id).update({
        "endDate":  endDate
    })
    
}

export const removeSPOC =async (email:string) => {
    const snapshot = await firestore()
                            .collection('employee')
                            .where('accountType', '==', 'spoc')
                            .where('email', '==', `${email}`)
                            .get();
    if (snapshot.empty) { return [];}
    
    let id = '';
    snapshot.forEach(doc => {id = doc.id});
    await firestore().collection('employee').doc(id).update({
        "accountType": "emp",
        "startDate": null,
        "endDate": null
    })

    const payload = {
        notification: {
        title: 'Account has been Modified',
        body: `Please login in to see details`
        }
      };

        //@ts-ignore
    if(snapshot.docs[0]._data.token != undefined){
        //@ts-ignore
        const token = snapshot.docs[0]._data.token
        sendNotifcation(token, payload.notification.title, payload.notification.body);
    }
}


export const getDetails =async (id:string) => {
    const snapshot = await firestore()
                            .collection('employee')
                            .doc(id)
                            .get();
    return snapshot;
  
}

export default manageSPOC;
