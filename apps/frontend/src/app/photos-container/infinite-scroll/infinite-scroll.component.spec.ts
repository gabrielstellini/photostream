import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollComponent } from './infinite-scroll.component';

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on the output when the intersectionObserver emits a new event', () => {
    const bottomReachedSpy = jest.spyOn(component.bottomReached, 'emit');
    expect(bottomReachedSpy).toHaveBeenCalledTimes(0);
    component['debouncer'].next(1);

    expect(bottomReachedSpy).toHaveBeenCalled();
  });
});
