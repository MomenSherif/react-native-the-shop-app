import React, { useCallback } from 'react';
import { Button, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../redux/actions/cart';

import colors from '../../constants/colors';

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  const selectItemHandler = useCallback((id, title) => navigation.navigate('ProductDetail', {
    id: id,
    title: title,
  }), []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem
          {...item}
          onSelect={() => selectItemHandler(item.id, item.title)}
        >
          <Button
            title='View Details'
            color={colors.primary}
            onPress={() => selectItemHandler(item.id, item.title)} />
          <Button
            title='To Cart'
            color={colors.primary}
            onPress={() => dispatch(addToCart(item))} />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={navigation.toggleDrawer}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ),
  }
}

export default ProductsOverviewScreen;