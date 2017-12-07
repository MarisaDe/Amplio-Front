import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient, private router: Router) { }


  search(query: string) {
    // const params: URLSearchParams = new URLSearchParams();
    // params.set('query', query);
    this.http.get('http://localhost:8080/api/user/search', {params: {query: query}})
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
