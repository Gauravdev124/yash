import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Dimensions ,Image,FlatList} from 'react-native';
import { useDispatch } from 'react-redux';
import { removeAnimal } from '../redux/slices/animalSlice';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
interface AnimalItemProps {
  id: string;
  name: string;
  breed: string;
  description:string;
  images:string[];
  onEdit: () => void;
}

const AnimalItem: React.FC<AnimalItemProps> = ({description, id, name,images , breed, onEdit }) => {
  console.log(description, id, name,images , breed,",,,,,,,,,,,,,,escription, id, name,images , breed,")
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
    <View style={{padding:mobileW*5/100,backgroundColor:"white",
    //  alignItems: 'center',
      justifyContent: 'space-between'}}>
       <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <Text> Animal name </Text>
       <Text >{name}</Text>
       </View>
      
       <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:mobileW*2/100}}>
       <Text>Animal Breed</Text>
      <Text>{breed}</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:mobileW*3/100}}>
       <Text>Animal Breed</Text>
      <Text>{description}</Text>
      </View>
      <FlatList
      data={images}
      horizontal
      renderItem={({ item }) => <Image source={{ uri: item }} style={styles.thumbnail} />}
      keyExtractor={(item, index) => index.toString()}
    />
      <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
      <TouchableOpacity onPress={()=>onEdit()}>
      <Image resizeMode='contain' style={{width:mobileW*10/100,height:mobileW*8/100,tintColor:"black"}} source={require('../icon/pencil.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(removeAnimal(id))}>
      <Image resizeMode='contain' style={{width:mobileW*10/100,height:mobileW*8/100,tintColor:"black"}} source={require('../icon/delete.png')}></Image>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
       padding: mobileW*5/100,
       backgroundColor:"#2E369980"


   },
   thumbnail: { width: 100, height: 100, marginHorizontal: 4 },
  
});

export default AnimalItem;
