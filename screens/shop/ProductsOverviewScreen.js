import React from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../redux/actions/cart';

const ProductsOverviewScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem
          {...item}
          onViewDetail={() => navigation.navigate('ProductDetail', {
            id: item.id,
            title: item.title,
          })}
          onAddToCart={() => dispatch(addToCart(item))}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'All Products',
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