import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text ,Dimensions ,FlatList ,Image} from 'react-native';
import { useDispatch } from 'react-redux';
import { addAnimal, editAnimal } from '../redux/slices/animalSlice';
import { launchImageLibrary } from 'react-native-image-picker';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
interface AnimalFormProps {
  onSubmit: () => void;
  initialData?: { id: string; name: string; breed: string; description: string ,images:string[]};
}

const AnimalForm: React.FC<AnimalFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  console.log(images,"......images")
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setBreed(initialData.breed);
      setDescription(initialData.description);
      setImages(initialData.images || []);
    }
  }, [initialData]);
  const handleSelectImages = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 });
    if (result.assets) {
      const newImages = result.assets.map((asset) => asset.uri || '');
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = () => {
    if (initialData) {
      // Editing existing animal
      dispatch(editAnimal({ id: initialData.id, name, breed, description , images }));
    } else {
      // Adding new animal
      dispatch(addAnimal({ name, breed, description, images: [] }));
    }

    setName('');
    setBreed('');
    setDescription('');
    onSubmit();
    setImages([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Animal Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Animal Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Show Selected Images */}
      <FlatList
        data={images}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
           <Image source={{ uri: item }} style={styles.thumbnail} />
        </View>
        }
      />

    
      
      <TouchableOpacity style={{backgroundColor:"#2E369980",width: mobileW * 50/ 100,borderRadius:mobileW*3/100,bottom:15,alignSelf:"center",
         height: mobileW * 12/ 100,justifyContent:"center",padding:mobileW*3/100,marginTop:mobileW*5/100}}  onPress={()=>handleSelectImages()}>
        <Text style={{color:"white",fontSize:mobileW*4/100,textAlign:"center",}}>Add Images at the time edit     </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"#2E369980",width: mobileW * 75/ 100,borderRadius:mobileW*3/100,bottom:15,alignSelf:"center",
         height: mobileW * 15 / 100,justifyContent:"center",padding:mobileW*3/100,marginTop:mobileW*5/100}}  onPress={()=>handleSubmit()}>
        <Text style={{color:"white",fontSize:mobileW*5/100,textAlign:"center",fontWeight:"600"}}>{initialData ? "Edit Animal" : "Add Animal"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
  thumbnail: { width: 100, height: 100, marginHorizontal: 4,margintop:mobileW*5/100 },
});

export default AnimalForm;

