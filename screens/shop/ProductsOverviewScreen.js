import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
}

export default ProductsOverviewScreen;