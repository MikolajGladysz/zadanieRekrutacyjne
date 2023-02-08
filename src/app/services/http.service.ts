import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService implements OnInit {
  // 1. Check for saved region
  // 1.2. Send http request to get region
  // 2. Save region to prevent unnecessary request

  savedRegions: { [k: string]: any } = {};
  currentCountry: { [k: string]: any } = { name: { common: '' } };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  getRegion(region: string) {
    // navigate to / on error
    if (this.savedRegions[region as keyof typeof this.savedRegions]) {
      return this.savedRegions[region as keyof typeof this.savedRegions];
    } else {
      return this.http
        .get(`https://restcountries.com/v3.1/region/${region}`)
        .pipe(
          catchError(() => {
            this.router.navigate(['/']);
            return 'Error Occured';
          }),
          // sort regions alphabetically
          map((resData) =>
            (resData as []).sort((a, b) =>
              a['name']['common'] > b['name']['common'] ? 1 : -1
            )
          ),
          tap((resData) => {
            this.savedRegions[region] = resData;
          })
        );
    }
  }
  getCountry(countryCode: string) {
    return this.http
      .get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .pipe(
        tap((resData) => {
          this.currentCountry = resData;
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return 'Error Occured';
        })
      );
  }
}
