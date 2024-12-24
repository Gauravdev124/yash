// redux/slices/animalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Animal {
  id: string;
  name: string;
  breed: string;
  description: string;
  images: string[];
}

interface AnimalState {
  animals: Animal[];
}

const initialState: AnimalState = {
  animals: [],
};

const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addAnimal: (state, action: PayloadAction<Omit<Animal, 'id'>>) => {
      const newAnimal = { id: Date.now().toString(), ...action.payload };
      state.animals.push(newAnimal);
    },
    removeAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.filter((animal) => animal.id !== action.payload);
    },
    editAnimal: (state, action: PayloadAction<Animal>) => {
      const index = state.animals.findIndex((animal) => animal.id === action.payload.id);
      if (index > -1) {
        state.animals[index] = action.payload;
      }
    },
  },
});

export const { addAnimal, removeAnimal, editAnimal } = animalSlice.actions;
export default animalSlice.reducer;
  
