import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const product = useSelector(state => state.products.availableProducts.find(prod => prod.id === id));

  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = ({navigation}) => {
  const title = navigation.getParam('title');
  return {
    headerTitle: title,
  }
}

const styles = StyleSheet.create({

});

export default ProductDetailScreen