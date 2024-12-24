import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AnimalList from './src/components/AnimalList';
import { persistor,store } from './src/redux/store';


const App = () => {
  return (
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <AnimalList />
      </PersistGate>
    </Provider>
  );
};

export default App;



