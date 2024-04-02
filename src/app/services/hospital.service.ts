import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IHospitalApi, IHospitalResponse, IHospitalsApi, IHospitalsApiSearch } from '../interfaces';
import { HospitalHelper } from '../models/hospital-helper.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private readonly baseUrl = `${environment.base_url}/hospitals`;

  constructor(private readonly httpClient: HttpClient) { }

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

  loadHospitals(): Observable<HospitalHelper[]> {
    return this.httpClient.get<IHospitalsApi>(this.baseUrl, this.headers)
      .pipe(
        map(resp => {
          return resp
            .hospitals
            .map(hospital => new HospitalHelper(
              hospital._id,
              hospital.uid,
              hospital.name,
              hospital.user,
              hospital?.img
            ));
        })
      );
  }

  getHospitals(): Observable<IHospitalResponse> {
    return this.httpClient.get<IHospitalResponse>(this.baseUrl, this.headers);
  }

  createHospital(name: string): Observable<IHospitalApi> {
    return this.httpClient.post<IHospitalApi>(this.baseUrl, { name }, this.headers);
  }

  updateHospital(hospital: HospitalHelper): Observable<HospitalHelper> {
    return this.httpClient.put<IHospitalApi>(`${this.baseUrl}/${hospital.uid}`, hospital, this.headers)
      .pipe(
        map(resp => {
          return new HospitalHelper(
            resp.hospital._id,
            resp.hospital.uid,
            resp.hospital.name,
            resp.hospital.user,
            resp.hospital.img
          );
        })
      );
  }

  deleteHospital(uid: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${uid}`, this.headers);
  }

  searchHospitals(termToSearch: string, collections: 'users' | 'doctors' | 'hospitals'): Observable<HospitalHelper[]> {
    return this.httpClient.get<IHospitalsApiSearch>(`${environment.base_url}/todos/collections/${collections}/${termToSearch}`, this.headers)
      .pipe(
        map(resp => {
          return resp
            .data
            .map(hospital => new HospitalHelper(
              hospital._id,
              hospital.uid,
              hospital.name,
              hospital.user,
              hospital.img
            ));
        })
      );
  }
}
