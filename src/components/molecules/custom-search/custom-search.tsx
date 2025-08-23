import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { getEmp } from '../../../firebase/empFetch';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './custom-search.style';

type CustomSearchProps = {
  changeModalVisibility: (bool: boolean) => void;
  setData: (option: string) => void;
  searchBy: string;
  location: string;
};

const CustomSearch = ({
  changeModalVisibility,
  setData,
  searchBy,
  location,
}: CustomSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      if (searchQuery.length > 0) {
        const data1 = await getEmp(searchQuery, location, searchBy);
        if (data1) {
          //@ts-ignore
          setSearchData(data1);
          setIsLoading(false);
        }
      } else {
        setSearchData([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchData.length === 0, searchQuery, isLoading]);

  const Item = ({ user }) => (
    <View
      style={{
        borderColor: '#ccc',
        elevation: 1,
        flex: 1,
        padding: 10,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: 'black' }}>Name: {user.name}</Text>
          <Text style={{ color: 'black' }}>Email: {user.email}</Text>
          <Text style={{ color: 'black' }}>Employee ID: {user.empId}</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = user => {
    return (
      <TouchableOpacity
        onPress={() => {
          setData(user.item);
          changeModalVisibility(false);
        }}>
        <Item user={user.item} />
      </TouchableOpacity>
    );
  };

  return searchBy === 'mail' ? (
    <KeyboardAvoidingView style={styles.modal}>
      <View style={styles.mainContent}>
        <Text style={styles.headText}>Search by Mail</Text>
        <TouchableOpacity onPress={() => changeModalVisibility(false)}>
          <Icon name="x" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
      <Searchbar
        placeholder={'Search...'}
        onChangeText={text => {
          setSearchQuery(text);
          setSearchData([]);
        }}
        value={searchQuery}
        style={{
          borderRadius: 10,
          marginTop: 2,
          width: '90%',
          marginLeft: 20,
          marginBottom: 10,
        }}
      />
      <View style={styles.screen}>
        <FlatList
          style={styles.list}
          data={searchData}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={renderItem}
        />
      </View>
    </KeyboardAvoidingView>
  ) : (
    <KeyboardAvoidingView style={styles.modal}>
      <View style={styles.mainContent}>
        <Text style={styles.headText}>Search by ID</Text>
        <TouchableOpacity onPress={() => changeModalVisibility(false)}>
          <Icon name="x" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
      <Searchbar
        placeholder={'Search...'}
        onChangeText={text => {
          setSearchQuery(text);
          setSearchData([]);
        }}
        value={searchQuery}
        style={{
          borderRadius: 10,
          marginTop: 2,
          width: '90%',
          marginLeft: 20,
          marginBottom: 10,
        }}
      />
      <View style={styles.screen}>
        <FlatList
          style={styles.list}
          data={searchData}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={renderItem}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomSearch;
