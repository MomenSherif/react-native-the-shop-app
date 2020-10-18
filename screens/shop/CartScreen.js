import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../redux/actions/cart';
import { addOrder } from '../../redux/actions/order';
import Card from '../../components/UI/Card';
import colors from '../../constants/colors';

const CartScreen = props => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems =
    useSelector(state => Object.entries(state.cart.items).map(([id, item]) => ({ id, ...item })).sort((a, b) => a.id > b.id ? 1 : -1));

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text></Text>
        <Button
          title="Order Now"
          onPress={() => dispatch(addOrder(cartItems, totalAmount))}
          disabled={!cartItems.length}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            {...item}
            deletable
            onRemove={() => dispatch(removeFromCart(item.id))}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: colors.secondary,
  },
});

export default CartScreen;