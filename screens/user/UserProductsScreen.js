import React from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

import colors from '../../constants/colors';
import { deleteProduct } from '../../redux/actions/products';

const UserProductsScreen = props => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          {...item}
          onSelect={() => { }}
        >
          <Button
            title='Edit'
            color={colors.primary}
            onPress={() => { }} />
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
  };
}

export default UserProductsScreen;