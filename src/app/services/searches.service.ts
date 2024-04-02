import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IDataDocumentModel } from '../interfaces/data-model-document.interface';
import { IDataDocument } from '../interfaces';
import { Observable, map } from 'rxjs';
import { Doctor, Hospital, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {
  private readonly url = environment.base_url;

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  searchUsersByAnything(termToSearch: string, collections: 'users' | 'doctors' | 'hospitals'): Observable<IDataDocumentModel> {
    return this.httpClient.get<IDataDocument>(`${this.url}/todos/collections/${collections}/${termToSearch}`, this.headers)
      .pipe(
        map((response: IDataDocument): IDataDocumentModel => {

          const res = response.data.map((item) => {

            if (item instanceof Hospital) {
              const user = new User(item.user.name, item.user.email).bind(item.user);
              return new Hospital(item._id, item.name, user).bind(item);
            }

            if (item instanceof Doctor) {
              const user = new User(item.user.name, item.user.email).bind(item.user);
              const hospital = new Hospital(item.hospital._id, item.hospital.name, user).bind(item.hospital);
              return new Doctor(item.name, user, hospital).bind(item);
            }

            if (item instanceof User) {
              return new User(item.name, item.email).bind(item);
            }
            return new User('test', 'test').bind(item);
          });
          if (res[ 0 ] instanceof User) {
            if (res[ 0 ].name === 'test') {
              return {
                ok: response.ok,
                data: []
              }
            }
          }
          return {
            ok: response.ok,
            data: res
          };
        })
      );
  }
}
