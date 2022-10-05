import {axiosService} from "./axiosService";
import {urls} from "../config";

export const productsService = {
    getAll: () => axiosService.get(urls.products).then(value => value.data),
    getById: (id) => axiosService.get(`${urls.products}/${id}`).then(value => value.data),
    create: (product) => axiosService.post(urls.products, product).then(value => value.data),
    updateById: (id, newProduct) => axiosService.put(`${urls.products}/${id}`, newProduct).then(value => value.data),
    deleteById: (id) => axiosService.delete(`${urls.products}/${id}`),
};