import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import colors from '../../constants/colors';
import { addToCart } from '../../redux/actions/cart';

const ProductDetailScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.availableProducts.find(prod => prod.id === id));

  return (
    <ScrollView>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.actions}>
        <Button title="Add to Cart" color={colors.primary} onPress={() => dispatch(addToCart(product))} />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('title');
  return {
    headerTitle: title,
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
});

export default ProductDetailScreen