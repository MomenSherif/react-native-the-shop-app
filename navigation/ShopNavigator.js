import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import colors from '../constants/colors';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
};

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen,
}, {
  defaultNavigationOptions,
});

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  defaultNavigationOptions,
});

const ShopNavigator = createDrawerNavigator({
  Products: {
    screen: ProductsNavigator,
    navigationOptions: {
      drawerIcon: (drawerConfig) =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          color={drawerConfig.tintColor}
        />
    }
  },
  Orders: {
    screen: OrdersScreen,
    navigationOptions: {
      drawerIcon: (drawerConfig) =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          color={drawerConfig.tintColor}
        />
    }
  },
}, {
  contentOptions: {
    activeTintColor: colors.primary
  }
});

export default createAppContainer(ShopNavigator);