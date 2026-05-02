import {AfterViewInit, Component, ElementRef, HostListener, ViewChild, inject} from '@angular/core';
import {PageContainerComponent} from '../../../../shared/page-container-component/page-container-component';
import {RevealDirective} from '../../../../shared/reveal-directive/reveal.directive';
import {RouterService} from '../../../services/router.service';

@Component({
  selector: 'app-macro-to-micro-component',
  imports: [PageContainerComponent, RevealDirective],
  templateUrl: './macro-to-micro-component.html',
  styleUrl: './macro-to-micro-component.scss',
})
export class MacroToMicroComponent implements AfterViewInit {
  @ViewChild('heroScrollContainer') heroScrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('heroTitle') heroTitle!: ElementRef<HTMLElement>;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef<HTMLElement>;

  private readonly routerService = inject(RouterService);

  private heroTitleRevealed = false;
  private readonly HERO_ANIMATION_SCROLL_DISTANCE = 400;

  ngAfterViewInit(): void {
    this.revealHeroTitle();
  }

  private revealHeroTitle(): void {
    const title = this.heroTitle?.nativeElement;
    if (!title) return;

    // Set starting position without transition so browser paints it first
    title.style.transform = 'translateY(110%)';

    // Give the browser one full frame to render the start state, then animate
    setTimeout(() => {
      title.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      title.style.transform = 'translateY(0)';
      title.addEventListener('transitionend', () => {
        title.style.transition = '';
        this.heroTitleRevealed = true;
      }, {once: true});
    }, 50);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected updateHeroAnimation(): void {
    if (!this.heroTitleRevealed) return;
    const container = this.heroScrollContainer?.nativeElement;
    const title = this.heroTitle?.nativeElement;
    const subtitle = this.heroSubtitle?.nativeElement;
    if (!container || !title || !subtitle) return;

    const scrolled = -container.getBoundingClientRect().top;
    const progress = Math.max(0, Math.min(1, scrolled / this.HERO_ANIMATION_SCROLL_DISTANCE));

    // Phase 1: title slides up out of clip container (progress 0 → 0.6)
    const titleProgress = Math.min(1, progress / 0.6);
    title.style.transform = `translateY(${-titleProgress * title.offsetHeight}px)`;

    // Phase 2: subtitle slides up into clip container (progress 0.6 → 1)
    const subtitleProgress = Math.max(0, (progress - 0.6) / 0.4);
    subtitle.style.transform = `translateY(${(1 - subtitleProgress) * 110}%)`;
  }

  protected navigateToWocy(): void { this.routerService.navigateToWocy(); }
  protected navigateToDryve(): void { this.routerService.navigateToDryve(); }
  protected navigateToSalt(): void { this.routerService.navigateToSalt(); }
}
