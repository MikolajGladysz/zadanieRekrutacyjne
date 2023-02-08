import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Output() showModalEmitter = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
  showModal() {
    this.showModalEmitter.next(true);
  }
}
