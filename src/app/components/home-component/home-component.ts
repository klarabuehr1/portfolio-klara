import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PageContainerComponent} from '../../../shared/page-container-component/page-container-component';
import {ButtonComponent} from '../../../shared/button-component/button-component';
import {RouterService} from '../../services/router.service';
import {RevealDirective} from '../../../shared/reveal-directive/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PageContainerComponent, ButtonComponent, ReactiveFormsModule, RevealDirective],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectsHeading') projectsHeading!: ElementRef<HTMLImageElement>;
  @ViewChild('aboutMeHeading') aboutMeHeading!: ElementRef<HTMLImageElement>;
  @ViewChild('letsWorkTogetherHeading') letsWorkTogetherHeading!: ElementRef<HTMLImageElement>;
  @ViewChild('heroScrollContainer') heroScrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('heroTitle') heroTitle!: ElementRef<HTMLElement>;
  @ViewChild('heroText') heroText!: ElementRef<HTMLElement>;

  contactForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  private readonly routerService = inject(RouterService);
  private heroTitleRevealed = false;

  readonly aboutImages = [
    'assets/About%20me%20Pictures/JiL1.jpeg',
    'assets/About%20me%20Pictures/Me.png',
    'assets/About%20me%20Pictures/drawing1.png',
    'assets/About%20me%20Pictures/soccer.jpeg',
  ];
  readonly currentAboutImageIndex = signal(0);
  private slideshowInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.revealHeroTitle();
    this.updateWidth();
    setTimeout(() => this.updateWidth(), 100);
    this.startSlideshow();
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

  private readonly HERO_ANIMATION_SCROLL_DISTANCE = 400;

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateWidth() {
    this.updateSVGWidth(this.projectsHeading?.nativeElement);
    this.updateSVGWidth(this.aboutMeHeading?.nativeElement);
    this.updateSVGWidth(this.letsWorkTogetherHeading?.nativeElement);
    this.updateHeroAnimation();
  }

  private updateHeroAnimation() {
    if (!this.heroTitleRevealed) return;
    const container = this.heroScrollContainer?.nativeElement;
    const title = this.heroTitle?.nativeElement;
    const text = this.heroText?.nativeElement;
    if (!container || !title || !text) return;

    const scrolled = -container.getBoundingClientRect().top;
    const progress = Math.max(0, Math.min(1, scrolled / this.HERO_ANIMATION_SCROLL_DISTANCE));

    // Phase 1: title slides up out of clip container (progress 0 → 0.6)
    const titleProgress = Math.min(1, progress / 0.6);
    title.style.transform = `translateY(${-titleProgress * title.offsetHeight}px)`;

    // Phase 2: text slides up into clip container (progress 0.6 → 1)
    const textProgress = Math.max(0, (progress - 0.6) / 0.4);
    text.style.transform = `translateY(${(1 - textProgress) * 110}%)`;
  }

  private updateSVGWidth(el: HTMLImageElement | undefined) {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight * 0.9)));

    el.style.width = `${10 + 200 * progress}%`;
    el.style.opacity = `${0.3 + 0.7 * progress}`;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.submitMessage = 'Please fill in all fields correctly.';
      return;
    }

    this.isSubmitting = true;
    const formData = this.contactForm.value;

    // TODO: Replace with EmailJS integration
    // For now, just log the data to console
    console.log('Form submitted:', formData);

    // Simulated submission
    setTimeout(() => {
      this.submitMessage = 'Message sent successfully!';
      this.contactForm.reset();
      this.isSubmitting = false;

      // Clear message after 3 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 3000);
    }, 1000);
  }

  private startSlideshow(): void {
    this.slideshowInterval = setInterval(() => {
      this.currentAboutImageIndex.update(i => (i + 1) % this.aboutImages.length);
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }

  navigateToMacroToMicro(): void {
    this.routerService.navigateToMacroToMicro();
  }

  navigateToWocy(): void {
    this.routerService.navigateToWocy();
  }

  navigateToDryve(): void {
    this.routerService.navigateToDryve();
  }

  navigateToSalt(): void {
    this.routerService.navigateToSalt();
  }
}

