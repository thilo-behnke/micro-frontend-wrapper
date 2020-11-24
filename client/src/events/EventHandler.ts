import {Observable, ReplaySubject} from "rxjs";
import {filter} from "rxjs/operators";

export interface EventHandler {
    send(eventName: string, payload: any): void;
    subscribe(eventName: string): Observable<any>;
}

export class DefaultEventHandler implements EventHandler {
    
    private subject = new ReplaySubject<{eventName: string; payload: any}>();

    send(eventName: string, payload: any): void {
        this.subject.next({eventName, payload});
    }

    subscribe(eventName: string): Observable<any> {
        return this.subject.asObservable().pipe(filter(({eventName: name}) => name === eventName));
    }
}
