import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../redux/actions/cart';
import { addOrder } from '../../redux/actions/order';
import colors from '../../constants/colors';

const CartScreen = props => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems =
    useSelector(state => Object.entries(state.cart.items).map(([id, item]) => ({ id, ...item })).sort((a, b) => a.id > b.id ? 1 : -1));

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text></Text>
        <Button
          title="Order Now"
          onPress={() => dispatch(addOrder(cartItems, totalAmount))}
          disabled={!cartItems.length}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            {...item}
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
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