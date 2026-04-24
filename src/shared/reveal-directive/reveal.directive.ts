import {Directive, ElementRef, inject, input, OnDestroy, OnInit, Renderer2} from '@angular/core';

/**
 * Reveals the host element by sliding it up from behind an invisible clip border,
 * triggered automatically when the element enters the viewport.
 *
 * Usage:  <div appReveal>text</div>
 * With stagger delay (ms):  <div appReveal [appRevealDelay]="150">text</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  readonly appRevealDelay = input<number>(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const host: HTMLElement = this.el.nativeElement;

    // Create the invisible clip container (the "unsichtbare Border")
    const wrapper: HTMLElement = this.renderer.createElement('div');
    this.renderer.setStyle(wrapper, 'overflow', 'hidden');
    this.renderer.setStyle(wrapper, 'display', 'block');

    const parent: HTMLElement = this.renderer.parentNode(host);
    this.renderer.insertBefore(parent, wrapper, host);
    this.renderer.appendChild(wrapper, host);

    // Start state: element sits below the clip border
    this.renderer.addClass(host, 'reveal-content');

    const delay = this.appRevealDelay();
    if (delay > 0) {
      this.renderer.setStyle(host, 'transition-delay', `${delay}ms`);
    }

    // Trigger reveal as soon as the wrapper enters the viewport
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(host, 'reveal-content--visible');
          this.observer?.disconnect();
        }
      },
      {threshold: 0.1, rootMargin: '0px 0px -40px 0px'},
    );
    this.observer.observe(wrapper);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
