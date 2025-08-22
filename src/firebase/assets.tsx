import firestore from '@react-native-firebase/firestore';
import getToken from './getToken';
import {sendNotifcation} from './sendNotification';

const displayAllAssestsAllocations = async (location: string) => {
  let assetsList: any = [];
  const snapshot = await firestore()
    .collection('assets')
    .where('isAllocated', '==', 'true')
    .get();
  const assets = snapshot.docs.map(doc => assetsList.push(doc.data()));
  return assetsList;
};

export default displayAllAssestsAllocations;

export const getAssetAllocatedUsers = async (location: string) => {
  let userList: any = [];
  location = location[0].toUpperCase() + location.substring(1);
  const user = await firestore()
    .collection('employee')
    .where('location', '==', `${location}`)
    .where('accountType', '==', 'emp')
    .get();
  user.forEach(doc => {
    userList.push(doc.data());
  });
  if (userList.length <= 0) {
    return null;
  } else {
    return userList;
  }
};

export const getAssetInfo = async (email: string) => {
  let dataListMain: any[] = [];
  const snapshot = await firestore()
    .collection('employee')
    .where('email', '==', `${email}`)
    .get();
  //@ts-ignore
  for (let i = 0; i < snapshot._docs[0]._data.assetInfo.length; i++) {
    //@ts-ignore
    const assestData = await firestore().collection('assets').doc(snapshot._docs[0]._data.assetInfo[i]).get();
    dataListMain.push(assestData.data());
  }
  if (dataListMain.length <= 0) {
    return null;
  } else {
    return dataListMain;
  }
};

export const updateAssetsInfo = async (
  email: string,
  endDate: Date,
  index: number,
) => {
  const snapshot = await firestore()
    .collection('employee')
    .where('accountType', '==', 'emp')
    .where('email', '==', `${email}`)
    .get();
  //@ts-ignore
  const id = snapshot._docs[0]._data.assetInfo[index];

  //@ts-ignore
  const assestData = await firestore().collection('assets').doc(id).update({
    endDate: endDate,
  });
};

export const removeAssets = async (
  email: string,
  assetRef: string,
  assetPath: string,
) => {
  const arr = assetPath.split('/');

  const snapshot = await firestore()
    .collection('employee')
    .where('accountType', '==', 'emp')
    .where('email', '==', `${email}`)
    .get();

  let id;
  snapshot.forEach(doc => {
    id = doc.id;
  });

  const removed = await firestore()
    .collection('employee')
    .doc(id)
    .update({
      assetInfo: firestore.FieldValue.arrayRemove(assetRef),
    });
  let path = '';
  for (let i = 1; i < arr.length; i = i + 2) {
    if (path === '') {
      path = path + arr[i - 1] + '/' + arr[i];
    } else {
      path = path + '/' + arr[i - 1] + '/' + arr[i];
    }
    const count1 = await firestore()
      .doc(path)
      .get()
      .then(s => {
        //@ts-ignore
        return s.data().count;
      });
    await firestore()
      .doc(path)
      .update({
        count: count1 + 1,
      });
  }

  const payload = {
    notification: {
      title: 'Assign has been removed from your account',
      body: `Please login in to see details`,
    },
  };

  const token = await getToken(email);
  if (token !== '') {
    sendNotifcation(
      token,
      payload.notification.title,
      payload.notification.body,
    );
  }

  // const assestData = await firestore()
  //             .collection('assets')
  //             .doc(assetRef)
  //             .delete()
};

export const addAsset = async (assetData: any) => {
  let obj = {
    projectName: assetData[0],
    serialNumber: assetData[1],
    startDate: assetData[3],
    endDate: assetData[4],
    spoc: assetData[6],
    status: 'pending',
    path: assetData[2],
  };
  const arr = assetData[2].split('/');
  var cat: any[] = [];
  var prod: any[] = [];
  for (var i = 0; i < arr.length; i += 2) {
    cat.push(arr[i]);
    arr[i + 1] && prod.push(arr[i + 1]);
  }
  for (let i = 0; i < cat.length; i++) {
    obj = {...obj, [cat[i]]: prod[i]};
  }
  await firestore().collection('assets').doc(assetData[1]).set(obj);
  const empId = await firestore()
    .collection('employee')
    .where('email', '==', assetData[5])
    .get()
    .then(snapshot => {
      return snapshot.docs[0].id;
    });
  await firestore()
    .collection('employee')
    .doc(empId)
    .update({assetInfo: firestore.FieldValue.arrayUnion(assetData[1])});
  let path = '';
  for (let i = 1; i < arr.length; i = i + 2) {
    if (path === '') {
      path = path + arr[i - 1] + '/' + arr[i];
    } else {
      path = path + '/' + arr[i - 1] + '/' + arr[i];
    }
    const count1 = await firestore()
      .doc(path)
      .get()
      .then(s => {
        //@ts-ignore
        return s.data().count;
      });
    await firestore()
      .doc(path)
      .update({
        count: count1 - 1,
      });
  }

  const payload = {
    notification: {
      title: 'Assign has been allocated to your account',
      body: `Please login in to see details`,
    },
  };

  const token = await getToken(assetData[5]);

  if (token !== '') {
    sendNotifcation(
      token,
      payload.notification.title,
      payload.notification.body,
    );
  }
};

export const updateAssetStatus = async (
  serialNumber: string,
  status: string,
) => {
  await firestore()
    .collection('assets')
    .doc(serialNumber)
    .update({status: status});
  const assetdata = await firestore()
    .collection('assets')
    .doc(serialNumber)
    .get();

  //@ts-ignore
  const data = await firestore().collection('employee').doc(assetdata._data.spoc).get();

  const payload = {
    notification: {
      title: `Status of Assets ${serialNumber} has been modified to ${status}  `,
      body: `Please login in to see details`,
    },
  };
  //@ts-ignore
  if (data._data.token != undefined) {
    //@ts-ignore
    const token = data._data.token;
    sendNotifcation(
      token,
      payload.notification.title,
      payload.notification.body,
    );
  }
};

export const addRequest = async (serialNumber: string, request: string) => {
  await firestore()
    .collection('assets')
    .doc(serialNumber)
    .update({request: request});
  const assetdata = await firestore()
    .collection('assets')
    .doc(serialNumber)
    .get();

  //@ts-ignore
  const data = await firestore().collection('employee').doc(assetdata._data.spoc).get();
  const payload = {
    notification: {
      title: `Request raise for Assets ${serialNumber} :  ${request}  `,
      body: `Please login in to see details`,
    },
  };
  //@ts-ignore
  if (data._data.token != undefined) {
    //@ts-ignore
    const token = data._data.token;
    sendNotifcation(
      token,
      payload.notification.title,
      payload.notification.body,
    );
  }
};
