package basket.backend

import basket.backend.model.Basket
import basket.backend.model.Product
import io.micronaut.http.annotation.*
import io.reactivex.Single

import javax.inject.Inject

@Controller('/api/basket')
class BasketController {

    @Inject
    private BasketService basketService

    @Get
    Single<Basket> getBasket() {
        return Single.just(basketService.getBasket())
    }

    @Patch('/${basketId}/items')
    Single<Basket> updateBasketItems(@PathVariable Long basketId, @Body BasketUpdateDTO basketUpdateDTO) {
        return Single.just(basketService.changeBasketItemCount(basketUpdateDTO.product, basketUpdateDTO.count))
    }

    @Delete('/${basketId}/items')
    Single<Basket> emptyBasket(@PathVariable Long basketId) {
        return Single.just(basketService.emptyBasket())
    }
}

class BasketUpdateDTO {
    Product product
    Integer count
}
