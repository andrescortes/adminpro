import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, fromEvent, interval, map, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnDestroy {

  intervalSubscription: Subscription = new Subscription();

  constructor() {
    // this.testObservable()
    //   .pipe(
    //     tap<number>((value) => console.log('tap', value)),
    //     retry(2),
    //   )
    //   .subscribe({
    //     next: (value) => {
    //       console.log('next', value);
    //     },
    //     error: (err) => {
    //       console.warn('error', err);
    //     },
    //   });

    // this.testObservable2();
    // this.intervalSubscription = this.interval().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  interval(): Observable<number> {
    return interval(500)
      .pipe(
        // take(5),
        map((value) => value + 1),
        filter((value) => (value % 2 === 0) ? true : false),
      );
  }

  testObservable(): Observable<number> {
    let i = 0;
    const interval$ = new Observable<number>((subscriber) => {
      const interval = setInterval(() => {
        i++;
        subscriber.next(i);
        if (i === 4) {
          clearInterval(interval);
          subscriber.complete();
        }
        if (i === 2) {
          clearInterval(interval);
          subscriber.error('i llego al valor de 2');
        }
      }, 1000);
    });
    return interval$;
  }

  testObservable2(): void {
    const source$ = fromEvent(document, 'click');
    const result$ = source$.pipe(
      switchMap((_, i) => i % 2 === 0
        ? fromEvent(document, 'mousemove').pipe(
          tap({
            subscribe: () => console.log('Subscribed to the mouse move events after click #' + i),
            unsubscribe: () => console.log('Mouse move events #' + i + ' unsubscribed'),
            finalize: () => console.log('Mouse move events #' + i + ' finalized')
          })
        )
        : interval(1_000).pipe(
          take(5),
          tap({
            subscribe: () => console.log('Subscribed to the 1-second interval events after click #' + i),
            unsubscribe: () => console.log('1-second interval events #' + i + ' unsubscribed'),
            finalize: () => console.log('1-second interval events #' + i + ' finalized')
          })
        )
      )
    );

    const subscription = result$.subscribe({
      next: console.log
    });

    setTimeout(() => {
      console.log('Unsubscribe after 60 seconds');
      subscription.unsubscribe();
    }, 60_000);
  }
}
