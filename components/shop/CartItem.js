import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
  const { quantity, productTitle, sum, deletable = false, onRemove } = props;
  return (
    <View style={styles.CartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${sum.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color='red'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
  mainText: {
    fontFamily: 'open-sans',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20
  },
});

export default CartItem;