import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserverChildDirective } from './observe-child.directive';
import { PhotoListComponent } from '../../shared/photo-list/photo-list.component';
import {
  auditTime,
  debounceTime,
  ReplaySubject,
  take,
  throttleTime,
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentSpinnerComponent } from './content-spinner/content-spinner.component';

@UntilDestroy()
@Component({
  selector: 'ps-infinite-scroll',
  standalone: true,
  imports: [
    CommonModule,
    ObserverChildDirective,
    PhotoListComponent,
    MatProgressSpinnerModule,
    ContentSpinnerComponent,
  ],
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent {
  /**
   *  Pixels from bottom of page to trigger bottomReached event
   */
  @Input() public thresholdPosition = 500;

  /**
   * Time until event is triggered
   */
  @Input() public thresholdMs = 500;

  /**
   * Time until event is triggered again, if the bottom is still reached
   */
  @Input() public recheckThresholdMs = 1000;

  @Input() public loading = false;

  @Output() public bottomReached = new EventEmitter<void>();

  private debouncer = new ReplaySubject<number>();

  public readonly observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      this.debouncer.next(entries[0].intersectionRatio);
    }
  );

  constructor() {
    this.debouncer
      .pipe(untilDestroyed(this), throttleTime(this.thresholdMs))
      .subscribe(() => {
        this.bottomReached.emit();

        this.recheckIntersection();
      });
  }

  /**
   * This function is used when the items all fit on the screen
   * @private
   */
  private recheckIntersection(): void {
    this.debouncer
      .pipe(
        untilDestroyed(this),
        debounceTime(this.recheckThresholdMs), // wait for 1 second of no events
        auditTime(0), // emit the most recently emitted value
        take(1)
      )
      .subscribe((ratio) => {
        if (ratio > 0) {
          this.bottomReached.emit();
          this.recheckIntersection();
        }
      });
  }
}
