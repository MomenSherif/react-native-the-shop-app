import React from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

import colors from '../../constants/colors';
import { deleteProduct } from '../../redux/actions/products';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userProducts);

  const editProductHandler = (id) => {
    navigation.navigate('ProductForm', {
      id,
    });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          {...item}
          onSelect={() => editProductHandler(item.id)}
        >
          <Button
            title='Edit'
            color={colors.primary}
            onPress={() => editProductHandler(item.id)} />
          <Button
            title='Delete'
            color={colors.primary}
            onPress={() => dispatch(deleteProduct(item.id))} />
        </ProductItem>
      )}
    />
  )
};

UserProductsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Products',
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
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navigation.navigate('ProductForm')}
        />
      </HeaderButtons>
    ),
  };
}

export default UserProductsScreen;