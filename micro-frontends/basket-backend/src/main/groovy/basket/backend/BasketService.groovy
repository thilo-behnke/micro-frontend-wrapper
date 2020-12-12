package basket.backend

import basket.backend.model.Basket
import basket.backend.model.BasketItem
import basket.backend.model.Product

import javax.inject.Singleton

@Singleton
class BasketService {
    private basket = new Basket()
    
    Basket getBasket() {
        return basket
    }

    Basket changeBasketItemCount(Product product, Integer count) {
        if(count > 0) {
            return addItemToBasket(product, count)
        } else if (count < 0) {
            return removeItemFromBasket(product, count)
        } else {
            return basket
        }
    }

    Basket addItemToBasket(Product product, Integer count = 1) {
        def itemInBasket = basket.items.find {it.product.id == product.id}
        if (itemInBasket) {
          itemInBasket.count += count
        } else {
            def item = new BasketItem(product: product, count: count)
            basket.items.add(item)
        }
        return basket
    }

    Basket removeItemFromBasket(Product product, Integer count = 1) {
        def itemInBasket = basket.items.find {it.product.id == product.id}
        if (itemInBasket && itemInBasket.count - count > 0) {
            itemInBasket.count -= count
        } else if (itemInBasket) {
            basket.items.remove(itemInBasket)
        }
        return basket
    }

    Basket emptyBasket() {
        basket.items.removeAll(basket.items)
        return basket
    }
}
