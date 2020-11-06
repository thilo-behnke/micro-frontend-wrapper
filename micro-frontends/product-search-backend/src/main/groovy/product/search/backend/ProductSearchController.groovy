package product.search.backend

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.QueryValue
import io.reactivex.Single
import product.search.backend.model.Product

import javax.inject.Inject

@Controller('/api/products')
class ProductSearchController {

    @Inject
    private ProductService productService

    @Get
    Single<List<Product>> getProducts(@QueryValue Optional<String> name) {
        return Single.just(productService.getProducts(name.orElseGet(() -> null)))
    }
}
