import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { createProduct, updateProduct } from '../../redux/actions/products';

const ProductFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const id = navigation.getParam('id');
  const product = useSelector(state => state.products.userProducts.find(prod => prod.id === id));

  const [title, setTitle] = useState(product?.title || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(product?.description || '');


  const submitHandler = useCallback(() => {
    if (id) {
      dispatch(updateProduct(id, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
  }, [dispatch, title, imageUrl, price, description]);

  useEffect(() => {
    navigation.setParams({ submitHandler });
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput value={title} onChangeText={setTitle} style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput value={imageUrl} onChangeText={setImageUrl} style={styles.input} />
        </View>
        {!product && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput value={price} onChangeText={setPrice} style={styles.input} />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput value={description} onChangeText={setDescription} style={styles.input} />
        </View>
      </View>
    </ScrollView>
  );
};

ProductFormScreen.navigationOptions = ({ navigation }) => {
  const submitHandler = navigation.getParam('submitHandler')
  return {
    headerTitle: navigation.getParam('id')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
});

export default ProductFormScreen;