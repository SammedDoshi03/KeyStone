import firestore from '@react-native-firebase/firestore';

const displayAllCategories = async () => {
    let categoryObject: any = [];
    const snapshot = await firestore().collection('category').get();
    snapshot.docs.map(doc => categoryObject.push({ key: doc.id, value: doc.data() }));
    return categoryObject;
}

export const displayAllSubCategories = async (path: string) => {
    console.log('firebase path', path)
    if(path != 'category') {
        try {
            const data = await firestore().doc(path).get().then(doc => {
                let categoryObject: any = [];
                if (doc.exists) {
                    categoryObject.push(doc.data());
                    return categoryObject
                }
            })
            const subCategoryObject: any[] = [];
            if(data[0].subCategory===undefined){
                return [path, null];
            }
            const newPath = path + data[0].subCategory;
            console.log('firebase new path', newPath)
            const data2 = await firestore().collection(newPath).get();
            data2.docs.map(doc => subCategoryObject.push({key: doc.id, value: doc.data()}));
            return [newPath, subCategoryObject];
        }
        catch (e) {
            console.log(e)
        }
    }
}

export default displayAllCategories;
