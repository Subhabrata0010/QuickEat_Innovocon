import { createSlice } from "@reduxjs/toolkit";

// Directly store menu data
const initialMenu = [
  {
    menuId: { S: "ITEM001" },
    foodName: { S: "Paneer Butter Masala" },
    type: { S: "Veg" },
    category: { S: "Main Course" },
    price: { N: "250" },
    quantity: { N: "10" },
    "image-url": {
      S: "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg",
    },
  },
  {
    menuId: { S: "ITEM002" },
    foodName: { S: "Chicken Biryani" },
    type: { S: "Non-Veg" },
    category: { S: "Main Course" },
    price: { N: "300" },
    quantity: { N: "15" },
    "image-url": {
      S: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoIycguxFgTpIN3L00tYQhJ2WkypXj5w_QkQ&s",
    },
  },
  {
    menuId: { S: "ITEM003" },
    foodName: { S: "Dal Tadka" },
    type: { S: "Veg" },
    category: { S: "Main Course" },
    price: { N: "180" },
    quantity: { N: "20" },
    "image-url": {
      S: "https://cinnamonsnail.com/wp-content/uploads/2023/04/Arhar-Dal-Feature-1-of-1.jpg",
    },
  },
  {
    menuId: { S: "ITEM004" },
    foodName: { S: "Mutton Curry" },
    type: { S: "Non-Veg" },
    category: { S: "Main Course" },
    price: { N: "350" },
    quantity: { N: "12" },
    "image-url": {
      S: "https://www.whiskaffair.com/wp-content/uploads/2018/01/Kerala-Style-Mutton-Curry-2-3.jpg",
    },
  },
  {
    menuId: { S: "ITEM005" },
    foodName: { S: "Veg Pulao" },
    type: { S: "Veg" },
    category: { S: "Main Course" },
    price: { N: "200" },
    quantity: { N: "18" },
    "image-url": {
      S: "https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured-500x500.jpg",
    },
  },
  {
    menuId: { S: "ITEM006" },
    foodName: { S: "Fish Fry" },
    type: { S: "Non-Veg" },
    category: { S: "Fast Food" },
    price: { N: "280" },
    quantity: { N: "10" },
    "image-url": {
      S: "https://www.relishthebite.com/wp-content/uploads/2017/07/fishfry-3.jpg",
    },
  },
  {
    menuId: { S: "ITEM007" },
    foodName: { S: "Aloo Paratha" },
    type: { S: "Veg" },
    category: { S: "Light Snacks" },
    price: { N: "100" },
    quantity: { N: "25" },
    "image-url": {
      S: "https://www.whiskaffair.com/wp-content/uploads/2020/06/Aloo-Paratha-2-3.jpg",
    },
  },
  {
    menuId: { S: "ITEM008" },
    foodName: { S: "Egg Curry" },
    type: { S: "Non-Veg" },
    category: { S: "Main Course" },
    price: { N: "220" },
    quantity: { N: "14" },
    "image-url": {
      S: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/06/south-indian-egg-curry-recipe.jpg",
    },
  },
  {
    menuId: { S: "ITEM009" },
    foodName: { S: "Chole Bhature" },
    type: { S: "Veg" },
    category: { S: "Fast Food" },
    price: { N: "160" },
    quantity: { N: "22" },
    "image-url": {
      S: "https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/1x1/1x1-punjabi-chole-bhature-chana-bhatura.jpg",
    },
  },
  {
    menuId: { S: "ITEM010" },
    foodName: { S: "Prawn Masala" },
    type: { S: "Non-Veg" },
    category: { S: "Main Course" },
    price: { N: "320" },
    quantity: { N: "8" },
    "image-url": {
      S: "https://www.whiskaffair.com/wp-content/uploads/2023/02/Shrimp-Masala-2-3.jpg",
    },
  },
  {
    menuId: { S: "ITEM011" },
    foodName: { S: "Mushroom Curry" },
    type: { S: "Veg" },
    category: { S: "Main Course" },
    price: { N: "230" },
    quantity: { N: "16" },
    "image-url": {
      S: "https://www.madhuseverydayindian.com/wp-content/uploads/2020/09/mushroom-curry-mushroom-masala.jpg",
    },
  },
  {
    menuId: { S: "ITEM012" },
    foodName: { S: "Butter Chicken" },
    type: { S: "Non-Veg" },
    category: { S: "Main Course" },
    price: { N: "280" },
    quantity: { N: "10" },
    "image-url": {
      S: "https://www.kitchensanctuary.com/wp-content/uploads/2021/04/Butter-Chicken-square-FS-34.jpg",
    },
  },
  {
    menuId: { S: "ITEM013" },
    foodName: { S: "Veg Hakka Noodles" },
    type: { S: "Veg" },
    category: { S: "Fast Food" },
    price: { N: "190" },
    quantity: { N: "17" },
    "image-url": {
      S: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/hakka-noodles-recipe.jpg",
    },
  },
  {
    menuId: { S: "ITEM014" },
    foodName: { S: "Chicken Lollipop" },
    type: { S: "Non-Veg" },
    category: { S: "Fast Food" },
    price: { N: "250" },
    quantity: { N: "15" },
    "image-url": {
      S: "https://littlebitrecipes.com/wp-content/uploads/2024/01/chicken-lollipop-sq.jpg",
    },
  },
  {
    menuId: { S: "ITEM015" },
    foodName: { S: "Palak Paneer" },
    type: { S: "Veg" },
    category: { S: "Main Course" },
    price: { N: "260" },
    quantity: { N: "12" },
    "image-url": {
      S: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/palak-paneer-recipe.jpg",
    },
  },
  {
    menuId: { S: "ITEM016" },
    foodName: { S: "Mutton Biryani" },
    type: { S: "Non-Veg" },
    category: { S: "Main Course" },
    price: { N: "370" },
    quantity: { N: "10" },
    "image-url": { S: "https://static.toiimg.com/photo/53094793.cms" },
  },
];

// Transform menu data to correct format
const formatMenuData = (data) => {
  return data.map((item) => ({
    id: item.menuId.S,
    name: item.foodName.S,
    type: item.type.S,
    category: item.category.S,
    price: parseFloat(item.price.N),
    quantity: parseInt(item.quantity.N),
    imageUrl: item["image-url"]?.S || "https://via.placeholder.com/150",
  }));
};

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: formatMenuData(initialMenu),
  },
  reducers: {
    reduceQuantity: (state, action) => {
      const itemIndex = state.menuItems.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1 && state.menuItems[itemIndex].quantity > 0) {
        state.menuItems[itemIndex].quantity -= 1;
      }
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.menuItems.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        state.menuItems[itemIndex].quantity += 1; // Restore quantity
      }
    },
  },
});

export const { reduceQuantity, increaseQuantity } = menuSlice.actions;
export default menuSlice.reducer;
