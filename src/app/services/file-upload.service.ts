import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly _url = environment.base_url;

  constructor() { }

  async updateFile(file: File, typeCollection: 'users' | 'doctors' | 'hospitals', id: string): Promise<Response> {
    const url = `${this._url}/uploads/collections/${typeCollection}/${id}`;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.token
        },
        body: formData
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      } else {
        return res;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
}
