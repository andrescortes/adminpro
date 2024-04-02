import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  private readonly base_url = environment.base_url;
  transform(img: string, type: 'users' | 'doctors' | 'hospitals'): string {
    if (img?.includes('https')) {
      return img;
    }
    if (!img) {
      return `${this.base_url}/uploads/collections/${type}/no-image.png`;
    }
    return `${this.base_url}/uploads/collections/${type}/${img}`;
  }

}
