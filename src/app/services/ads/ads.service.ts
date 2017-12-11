import {Config} from '../../common/config';
import {Injectable} from '@angular/core';

@Injectable()
export class AdsService {
  ads = [];
  adPath = Config.AD_IMAGES;

  constructor() {

    for (let i = 1; i < 5; i++) {
      this.ads.push(this.adPath + i + '.jpg');
    }
  }

  getRandomAd() {
    const index = Math.floor(Math.random() * this.ads.length);
    return this.ads[index];
  }
  }
