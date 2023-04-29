import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ps-infinite-scroll',
  template: '<h1>Fake Infinite scroll</h1><ng-content></ng-content>',
  standalone: true,
})
export class MockInfiniteScrollComponent {
  @Input() public loading = true;
  @Output() public bottomReached = new EventEmitter<void>();
}
