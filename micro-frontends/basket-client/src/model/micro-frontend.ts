import type { Observable } from "rxjs";
import type { Product } from "./product";
import { ReplaySubject } from "rxjs";
import { filter, map } from "rxjs/operators";

export type BaseEvent<T> = { type: EventType; payload?: T };

// TODO: This needs to be moved into a lib - otherwise it will be duplicated in the micro frontends.
export interface EventHandler {
  send<T>(event: BaseEvent<T>): void;

  receive<T, E extends BaseEvent<T>>(...type: string[]): Observable<E>;
}

export class EventHandlerStub implements EventHandler {
  private subject = new ReplaySubject<{ type: string; payload: any }>();

  send<T>({ type, payload }: BaseEvent<T>): void {
    this.subject.next({ type, payload });
  }

  receive<T, E extends BaseEvent<T>>(...types: string[]): Observable<E> {
    return this.subject.asObservable().pipe(
      filter(({ type: name }) => types.includes(name)),
      map((e) => e as E)
    );
  }
}

export enum EventType {
  INCREMENT_BASKET_COUNT = "INCREMENT_BASKET_COUNT",
  DECREMENT_BASKET_COUNT = "DECREMENT_BASKET_COUNT",
}

export type IncrementBasketCount = {
  type: EventType.INCREMENT_BASKET_COUNT;
  payload: Product;
};
export type DecrementBasketCount = {
  type: EventType.DECREMENT_BASKET_COUNT;
  payload: Product;
};
export type WebShopAppEvent = IncrementBasketCount | DecrementBasketCount;
