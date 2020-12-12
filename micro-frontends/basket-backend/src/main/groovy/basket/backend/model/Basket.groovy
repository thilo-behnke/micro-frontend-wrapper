package basket.backend.model

import groovy.transform.Immutable

class Basket {
    List<BasketItem> items
}

class BasketItem {
    Product product
    Integer count
}
