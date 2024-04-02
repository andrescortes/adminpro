import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDoctorApi, IDoctorsApi, IDoctorsApiData } from '../interfaces';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly baseUrl = `${environment.base_url}/doctors`

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

  getDoctors(): Observable<IDoctorApi[]> {
    return this.httpClient.get<IDoctorsApiData>(this.baseUrl, this.headers)
      .pipe(
        map(resp => resp.doctors)
      );
  }

  createDoctor(name: string, hospital: string): Observable<IDoctorApi> {
    return this.httpClient.post<IDoctorApi>(this.baseUrl, { name, hospital }, this.headers);
  }

  updateDoctor(uid: string, name: string, hospital: string): Observable<IDoctorApi> {
    return this.httpClient.put<IDoctorApi>(`${this.baseUrl}/${uid}`, { name, hospital }, this.headers);
  }

  searchHospitals(term: string, collections: 'users' | 'doctors' | 'hospitals'): Observable<IDoctorApi[]> {
    return this.httpClient.get<IDoctorsApi>(`${this.baseUrl}/todos/collections/${collections}/${term}`, this.headers)
      .pipe(
        map(resp => resp.data)
      );
  }

  deleteDoctor(uid: string): Observable<IDoctorApi> {
    return this.httpClient.delete<IDoctorApi>(`${this.baseUrl}/${uid}`, this.headers);
  }
}
