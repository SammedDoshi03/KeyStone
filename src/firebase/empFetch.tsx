import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const getEmp = async (searchQuery: string, location: string, searchBy: string)  => {
    console.log('searchQuery', searchQuery)
    location = location[0].toUpperCase() + location.substring(1);
    const spocDetails = await firestore()
                                .collection('employee')
                                .where('accountType', '==', 'emp')
                                .where('location', '==', `${location}`)
                                .get()
    let dataList: any[] = [];
    let res: any[] = [];
        spocDetails.forEach(doc => {
            dataList.push(doc.data());
        });
        if(dataList.length<=0) {
            return null;
        } else {
            if(searchBy === 'mail'){
                const a = dataList.forEach(e => {
                if(e.email.startsWith(searchQuery)) {
                    console.log('email', e)
                    res.push(e);
                }
                })
            }
            else{
                const a = dataList.forEach(e => {
                    console.log('e whole', e.empId.startsWith(searchQuery))
                    if(e.empId.startsWith(searchQuery)) {
                        console.log('e', e)
                        res.push(e);
                    }
                })
            }
            return res
        }
}

export const getUserCount =async (location:string) => {
    location = location[0].toUpperCase() + location.substring(1);
    const snapshot = await firestore()
                                .collection('employee')
                                .where('accountType', '==', 'emp')
                                .where('location', '==', `${location}`)
                                .get()
    let dataList: any[] = [];
    snapshot.forEach(doc => {
        dataList.push(doc.data());
    });
    if(dataList.length<=0) {
        return 0;
    } else {
        return dataList.length;
    }
}