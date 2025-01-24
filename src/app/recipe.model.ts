export interface Recipe {
    id: number;
    title: string;
    description: string;
    cookingTime: number;
    image: string;
    steps: string[];
    ingredients?: Ingredient[];
  }

  export interface Ingredient {
    name: string;
    amount: string,
  }
  
  