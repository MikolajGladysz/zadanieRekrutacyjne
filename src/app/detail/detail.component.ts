import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  country: { [k: string]: any } = {
    name: {
      common: '',
    },
    capital: '',
    flags: { svg: '' },
  };
  currency: string = '';
  populationFormatted: string = '';
  showSpinner: boolean = false;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    const url = this.router.url.split('/').at(-1);
    if (url) {
      this.showSpinner = true;
      this.httpService.getCountry(url).subscribe(
        (resData: any) => {
          this.country = resData[0];
          this.showSpinner = false;
          this.getCurrencies();
          this.getPopulation();
        },
        (err: any) => {
          console.log('Coundnt find api:');
          this.showSpinner = false;
        }
      );
    }
  }

  getCurrencies() {
    this.currency = Object.values(this.country['currencies'])
      .map((currency: any) => currency['name'])
      .join(', ');
  }
  getPopulation() {
    const population: number = this.country['population'];
    // Formatting population number
    const si = [
      { value: 1e3, symbol: 'tys' },
      { value: 1e6, symbol: 'mln' },
      { value: 1e9, symbol: 'mld' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    // for negative value is work
    for (i = si.length - 1; i > 0; i--) {
      if (Math.abs(population) >= si[i].value) {
        break;
      }
    }
    this.populationFormatted =
      (population / si[i].value).toFixed(2).replace(rx, '$1') + si[i].symbol;
  }
}
