import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading$ = new BehaviorSubject(false);

  loading() {
    this.loading$.next(true);
  }

  done() {
    this.loading$.next(false);
  }
}
