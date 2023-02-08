import { Component, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('map') mapElement: any;

  title = 'zadanie-rekrutacyjne';

  // Offset for map zoom
  regionOffset = {
    americas: [1.2, 23, -1],
    africa: [2.1, -5, -8],
    europe: [5, -3, 27],
    asia: [2, -18, 23],
    oceania: [2, -36, -22],
  };

  region: string | undefined;
  showModal: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    // zoom on region on navigation
    this.router.events.subscribe((ev: Event) => {
      if (ev instanceof NavigationStart) {
        this.region = Object.keys(this.regionOffset).find((key) =>
          ev.url.includes(key)
        );
        if (this.region) {
          this.zoomOnMap(
            this.regionOffset[
              this.region as keyof typeof this.regionOffset
            ] as [number, number, number]
          );
        } else {
          this.zoomOnMap();
        }
      }
    });
  }
  zoomOnMap(offset = [1, 0, 0]) {
    this.mapElement.nativeElement.style.transform = `scale(${offset[0]}) translate(${offset[1]}%,${offset[2]}%)`;
  }
}
