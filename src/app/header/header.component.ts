import { Component, Input, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() displayedValue: string | undefined;

  navigationArr: string[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((ev: Event) => {
      if (ev instanceof NavigationStart) {
        this.navigationArr = ev.url.split('/').filter((val) => val !== '');
      }
    });
  }
  navigate(navIndex: number) {
    let navLink: string = '';
    for (let i = 0; i <= navIndex; i++) {
      navLink += '/' + this.navigationArr[i];
    }

    this.router.navigate([navLink]);
  }
}
