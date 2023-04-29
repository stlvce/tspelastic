import { create } from 'zustand'

export const useProductsStore = create((set, get) => ({
  products: [],
  isLoading: false,
  getProducts: async () => {
    const response = await fetch('http://localhost:5000/products');
    const data = await response.json();
    if(get().products !== data.products){
      set({ products: data.products });
    }
  },
  updateProduct: () => {
    console.log("Написать")
  },
  updateProductfetch: async (id) => {
    console.log("Написать 2")
    return id
  }
}))

export const useCategoriesStore = create((set, get) => ({
  categories: [],
  getCategories: async () => {
    const response = await fetch('http://localhost:5000/categories')
    const data = await response.json();
    set({ categories: data.categories });
  },
  updateCategory: (id, key, value) =>{
      set((state) => ({
        categories: state.categories.map((category) =>
        category.id === id
            ? ({ ...category, [key]: value })
            : category
        ),
      }))
  },
  updateCategoryfetch: async (id) =>{
    const select_category = get().categories.filter(category=> category.id === id)[0];
    let data = {
      'id': select_category.id,
      'name': select_category.name,
      'start_x': select_category.start_x,
      'start_y': select_category.start_y,
      'end_x': select_category.end_x,
      'end_y': select_category.end_y
    }
    const response = await fetch('http://localhost:5000/category', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const resp =  await response.json();
    return resp.msg;
  }
}))

