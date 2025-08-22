import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Loader from 'react-native-three-dots-loader';

export default function CustomLoader() {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={true}
      style={{ zIndex: 1100 }}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Loader background="#4DABD7" activeBackground="#3274AB" size={10} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
