package product.search.backend

import product.search.backend.model.Product

import javax.inject.Singleton

@Singleton
class ProductService {
    
    private final PRODUCTS = [
            new Product(id: 0, name: "Xbox", desc: "Video game console by Microsoft", price: 399.99, release: new Date()),
            new Product(id: 1, name: "Playstation", desc: "Video game console by Sony", price: 499.99, release: new Date())
    ]
    
    List<Product> getProducts(String name = null) {
        if(name == null) {
            return PRODUCTS
        }
        return PRODUCTS.findAll {product -> product.name.contains(name)} 
    }
}
