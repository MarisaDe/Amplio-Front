import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Config} from '../../common/config'

@Injectable()
export class SearchService {

  constructor(private http: HttpClient, private router: Router) { }


  search(query: string) {
    // const params: URLSearchParams = new URLSearchParams();
    // params.set('query', query);
    this.http.get(Config.API_URI + 'user/search', {params: {query: query}})
      .subscribe(
        resp => {
          console.log(resp);
          console.log('TODO SEARCH');
          this.router.navigate(['/search']);
        },
        err => {
          console.error(err);
        }
      );
  }

}
