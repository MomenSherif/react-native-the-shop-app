import React from 'react';
import { Text, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders);
  console.log(orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text>{item.amount}</Text>
      )}
    />
  )
};

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={navigation.toggleDrawer}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;