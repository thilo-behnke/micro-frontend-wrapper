import {Observable, ReplaySubject} from "rxjs";
import {filter, map} from "rxjs/operators";
import {EventType} from "../../../micro-frontends/product-search-client/src/model/micro-frontend";

export type BaseEvent<T> = { type: EventType, payload?: T }

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
