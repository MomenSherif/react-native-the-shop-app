import React, { useCallback, useEffect, useReducer } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import { createProduct, updateProduct } from '../../redux/actions/products';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'FORM_INPUT_UPDATE':
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: Object.values(updatedValidities).every(isValid => isValid),
      };
    default:
      return state;
  }
};

const ProductFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const id = navigation.getParam('id');
  const product = useSelector(state => state.products.userProducts.find(prod => prod.id === id));

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product?.title || '',
      imageUrl: product?.imageUrl || '',
      price: '',
      description: product?.description || '',
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      price: product ? true : false,
      description: product ? true : false,
    },
    formIsValid: product ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid)
      return Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);

    const { title, imageUrl, price, description } = formState.inputValues;

    if (id) {
      dispatch(updateProduct(id, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }

    navigation.goBack();
  }, [dispatch, formState]);

  useEffect(() => {
    navigation.setParams({ submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = (input, value, isValid) => {
    dispatchFormState({
      type: 'FORM_INPUT_UPDATE',
      value,
      isValid,
      input,
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            label='Title'
            errorMessage='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            initialValue={formState.inputValues.title}
            initiallyValid={formState.inputValidities.title}
            onInputChange={(value, isValid) => inputChangeHandler('title', value, isValid)}
            required
          />

          <Input
            label='Image Url'
            errorMessage='Please enter a valid image url!'
            keyboardType='default'
            returnKeyType='next'
            initialValue={formState.inputValues.imageUrl}
            initiallyValid={formState.inputValidities.imageUrl}
            onInputChange={(value, isValid) => inputChangeHandler('imageUrl', value, isValid)}
            required
          />

          {!product && (
            <Input
              label='Price'
              errorMessage='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              initialValue={formState.inputValues.price}
              initiallyValid={formState.inputValidities.price}
              onInputChange={(value, isValid) => inputChangeHandler('price', value, isValid)}
              required
              min={0.1}
            />
          )}

          <Input
            label='Description'
            errorMessage='Please enter a valid description!'
            keyboardType='decimal-pad'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={formState.inputValues.description}
            initiallyValid={formState.inputValidities.description}
            onInputChange={(value, isValid) => inputChangeHandler('description', value, isValid)}
            required
            minLength={5}
          />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

});

export default ProductFormScreen;