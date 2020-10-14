import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = ({navigation}) => {
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
          onAddToCart={() => console.log(`Add ${item.title} to cart`)}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
}

export default ProductsOverviewScreen;