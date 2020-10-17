import React from 'react';
import { Button, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

import colors from '../../constants/colors';

const UserProductsScreen = props => {
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
            onPress={() => { }} />
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