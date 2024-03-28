import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hideModal$ = new BehaviorSubject<boolean>(true);
  private _updateImg$ = new BehaviorSubject<boolean>(true);

  typeCollection!: 'users' | 'doctors' | 'hospitals';
  uid!: string;
  img!: string;

  get hideModal$(): Observable<boolean> {
    return this._hideModal$.asObservable();
  }

  get updateImg$(): Observable<boolean> {
    return this._updateImg$.asObservable();
  }

  updateImg(): void {
    this._updateImg$.next(true);
  }

  openModal(typeCollection: 'users' | 'doctors' | 'hospitals', uid: string): void {
    this.typeCollection = typeCollection;
    this.uid = uid;
    this._hideModal$.next(false);
  }

  closeModal(): void {
    this._hideModal$.next(true);
  }

  constructor() { }
}
