import React, { useState } from 'react';
import { FlatList, View, Button , TouchableOpacity ,Text, Dimensions, StyleSheet,SafeAreaView,StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AnimalItem from './AnimalItem';
import AnimalForm from './AnimalForm';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const AnimalList = () => {
  const animals = useSelector((state: RootState) => state.animals.animals);
  console.log(animals,"animals..........");
  
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleEdit = (animal: any) => {
    setSelectedAnimal(animal);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedAnimal(null);
    setIsFormOpen(false);
  };
  const imageStyles = {
    width: mobileW * 25 / 100,
    height: mobileW * 25 / 100,
    borderRadius: 8,
    margin: 5,
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#2E369980" />
     
       <Text style={{fontSize:mobileW*8/100,textAlign:"center",padding:mobileW*5/100}}>Zoo Tracker... </Text>
     
      {isFormOpen && (
        <AnimalForm
          onSubmit={closeForm}
          initialData={selectedAnimal}
        />
      )}

     {animals == "" ?
     <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
     <Text style={{fontSize:mobileW*8/100}}>Data is not awailable </Text>
     </View>
     :
      <FlatList
        data={animals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimalItem
            id={item.id}
            name={item.name}
            breed={item.breed}
            description={item.description}
            images = {item.images}
            onEdit={() => handleEdit(item)} 
            imageStyles={imageStyles}
          />
          
        )}
      />
     
}

<TouchableOpacity style={{backgroundColor:"#2E369980",width: mobileW * 35/ 100,borderRadius:mobileW*3/100,bottom:15,alignSelf:"center",
    height: mobileW * 15 / 100,justifyContent:"center",padding:mobileW*3/100}} onPress={() => setIsFormOpen(true)}>
        <Text style={{fontSize:mobileW*4/100,color:"white",fontWeight:"500",textAlign:"center"}}>{selectedAnimal ? "Edit Animal" : "Add Animal"}</Text>
      </TouchableOpacity>
     </SafeAreaView>
     </View>
  );
};

export default AnimalList;
const styles = StyleSheet.create({

})

