import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[psObserverChild]',
  standalone: true,
})
export class ObserverChildDirective implements AfterViewInit {
  @Input() observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  static ngTemplateContextGuard(
    directive: ObserverChildDirective,
    context: unknown
  ): context is ObserverChildContext {
    return true;
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.el.nativeElement);
  }
}

interface ObserverChildContext {
  observer: IntersectionObserver;
}
