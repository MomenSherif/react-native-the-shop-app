import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CartItem from './CartItem';
import Card from '../UI/Card';
import colors from '../../constants/colors';

const OrderItem = props => {
  const { amount, date, items } = props;
  const [showDeatils, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date.toDateString()}</Text>
      </View>
      <Button
        title={showDeatils ? 'Hide Details' : 'Show Details'}
        color={colors.primary}
        onPress={() => setShowDetails(prevShowDetails => !prevShowDetails)}
      />
      {showDeatils && (
        <View style={styles.detailItems}>
          {items.map(cartItem => <CartItem key={cartItem.id} {...cartItem} />)}
        </View>
      )}
    </Card>
  )
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%'
  }
});

export default OrderItem;