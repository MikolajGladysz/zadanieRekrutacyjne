import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  showSpinner: boolean = false;
  regionData: any = [];

  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit(): void {
    const region = this.router.url.slice(1);

    if (
      this.httpService.savedRegions[
        region as keyof typeof this.httpService.savedRegions
      ]
    ) {
      this.regionData = this.httpService.savedRegions[region];
    } else {
      this.showSpinner = true;
      this.httpService.getRegion(region).subscribe(
        (resData: any) => {
          this.regionData = resData;
          this.showSpinner = false;
          console.log(resData);
        },
        (err: any) => {
          console.log('Coundnt find api:');
          this.showSpinner = false;
        }
      );
    }
  }
}
