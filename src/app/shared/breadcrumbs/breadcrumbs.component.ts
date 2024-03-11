import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
export class BreadcrumbsComponent implements OnDestroy {

  title: string = '';
  titleSub: Subscription = new Subscription();

  constructor(private readonly router: Router) {
    this.titleSub = this.uploadTitle()
      .subscribe((event) => {
        this.title = event
        document.title = `AdminPro - ${event}`
      });;
  }

  ngOnDestroy(): void {
    this.titleSub.unsubscribe();
  }

  uploadTitle(): Observable<string> {
    return this.router
      .events
      .pipe(
        // filter(event => event instanceof ActivationEnd),
        // filter((event) => (event as ActivationEnd).snapshot.firstChild === null),
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd): string => event.snapshot.data[ 'title' ]),
      );
  }
}
