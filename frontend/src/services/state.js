import { create } from 'zustand'
import Point from './point';

export const useProductsStore = create((set, get) => ({
  products: [],
  isLoading: false,
  getProducts: async () => {
    set({ isLoading: true });
    const response = await fetch('http://localhost:5000/products');
    const data = await response.json();
    if(get().products !== data.products){
      set({ products: data.products });
      set({ isLoading: false });
    }
  },
  updateProduct: (id, key, value) => {
    set((state) => ({
      products: state.products.map((product) =>
      product.id === id
          ? ({ ...product, [key]: value })
          : product
      ),
    }))
  },
  updateProductfetch: async (id) => {
    const select_product = get().products.filter(product=> product.id === id)[0];
    let data = {
      'id': select_product.id,
      'name': select_product.name,
      'image': select_product.image,
      'description': select_product.description,
      'category_id': select_product.category_id
    }
    const response = await fetch('http://localhost:5000/product', {
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

export const useCategoriesStore = create((set, get) => ({
  categories: [],
  valid: true,
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

export const useCanvasStore = create((set, get) => ({
  selectedProducts: [],
  sortSelectedProducts: [],
  hoverProduct: -1,
  started: false,
  params: {
    alpha: 0.2,
    beta: 2,
    initialK: 0.2,
    epsilon: 0.02,
    kAlpha: 0.99,
    kUpdatePeriod: 25,
    maxNumIter: 100000,
    numPointsFactor: 2.5,
    radius: 0.1,
    },
  saveParams: (obj) => set({ params: obj }),
  // setParams: (key, payload) => set(params[key] = payload),
  setHoverProduct: (id) => set({ hoverProduct: id }),
  setStarted: (bool) => set({ started: bool }),
  setSortedProducts: (newArray) => set({ sortSelectedProducts: newArray }),
  add_select_product: (id, category, width, height) =>{
    const xRange = category.end_x - category.start_x;
    const yRange = category.end_y - category.start_y;
    const x = Math.random() * xRange + category.start_x;
    const y = Math.random() * yRange + category.start_y;
    const xNorm = x / width;
    const yNorm = y / height;
    set((state) => ({
      selectedProducts: [
        ...state.selectedProducts, new Point(xNorm, yNorm, id)
      ]
    }))
  },
  del_select_product: (id) =>{
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(selpro => {return selpro.id !== id})
    }))
  },
}))