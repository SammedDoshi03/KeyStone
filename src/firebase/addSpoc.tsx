import email from 'react-native-email';
import firestore from '@react-native-firebase/firestore';
import { sendNotifcation } from './sendNotification';

export const handleEmail = (emailAdd: string) => {
    const to = [emailAdd] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        subject: 'You have been assigned as spoc for your location.',
        body: `Your Credentials are \nEmail ID: ${emailAdd}\nPassword:pass@123`,
        checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error)
}

const addSpoc = async (email: string, startDate: Date, endDate: Date, location: string) => {

    let flag = true;
    //@ts-ignore
    const data = await firestore().collection('employee').where("email", "==", email).get();

    //@ts-ignore
    if(data.docs.length === 0 || data.docs[0]._data.accountType !== "emp" || data.docs[0]._data.location !== location) {
        flag=false
    }

    
   

    if(flag) {
        let id = "";
        data.forEach(doc => {
            id = doc.id
        });

        await firestore().collection('employee').doc(id).update({
            "accountType": "spoc",
            "startDate": new Date(startDate),
            "endDate":  new Date(endDate)
        });

        const payload = {
            notification: {
            title: 'Account has been Modified',
            body: `Please login in to see details`
            }
          };    
        //@ts-ignore
        if(data.docs[0]._data.token != undefined){
            //@ts-ignore
            const token = data.docs[0]._data.token
            sendNotifcation(token, payload.notification.title, payload.notification.body);
        }
    }
    return flag;
}

export default addSpoc;
