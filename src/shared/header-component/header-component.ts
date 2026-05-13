import {AfterViewInit, Component, ElementRef, HostListener, ViewChild, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {RouterService} from '../../app/services/router.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  @ViewChild('headerElement') headerElement?: ElementRef<HTMLElement>;
  @ViewChild('logoElement') logoElement?: ElementRef<HTMLElement>;
  @ViewChild('navElement') navElement?: ElementRef<HTMLElement>;

  private routerService = inject(RouterService);
  private router = inject(Router);

  protected useLightLogo = false;
  protected useLightNavLinks = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.updateNavLinkContrast();
      });
  }

  ngAfterViewInit(): void {
    this.updateNavLinkContrast();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected updateNavLinkContrast(): void {
    const headerEl = this.headerElement?.nativeElement;
    if (!headerEl) return;

    const headerMidY = headerEl.getBoundingClientRect().height / 2;

    const logoRect = this.logoElement?.nativeElement.getBoundingClientRect();
    const navRect = this.navElement?.nativeElement.getBoundingClientRect();

    const logoMidX = logoRect ? logoRect.left + logoRect.width / 2 : 60;
    const navMidX = navRect ? navRect.left + navRect.width / 2 : window.innerWidth - 120;

    this.useLightLogo = this.sampleIsLight(logoMidX, headerMidY, headerEl);
    this.useLightNavLinks = this.sampleIsLight(navMidX, headerMidY, headerEl);
  }

  private sampleIsLight(x: number, y: number, headerEl: HTMLElement): boolean {
    const elements = document.elementsFromPoint(x, y) as HTMLElement[];

    for (const el of elements) {
      if (el === headerEl || headerEl.contains(el)) continue;

      if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 1;
          canvas.height = 1;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const rect = el.getBoundingClientRect();
            const scaleX = (el instanceof HTMLImageElement ? el.naturalWidth : el.videoWidth) / rect.width;
            const scaleY = (el instanceof HTMLImageElement ? el.naturalHeight : el.videoHeight) / rect.height;
            const srcX = (x - rect.left) * scaleX;
            const srcY = (y - rect.top) * scaleY;
            ctx.drawImage(el, srcX, srcY, 1, 1, 0, 0, 1, 1);
            const data = ctx.getImageData(0, 0, 1, 1).data;
            if (data[3] > 10) {
              const luminance = (0.299 * data[0] + 0.587 * data[1] + 0.114 * data[2]) / 255;
              return luminance < 0.5;
            }
          }
        } catch {
          // Canvas taint, fall through
        }
      }

      const bg = window.getComputedStyle(el).backgroundColor;
      const rgb = bg.match(/\d+/g)?.map(Number);
      if (!rgb || rgb.length < 3) continue;

      const alpha = rgb[3] ?? 1;
      if (alpha === 0 || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') continue;

      const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      return luminance < 0.5;
    }

    return false;
  }

  protected isOnHomeRoute(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/home');
  }


  protected navigateToHome() {
    this.routerService.navigateToHome();
  }

  protected scrollToTop(): void {
    if (!this.isOnHomeRoute()) {
      this.routerService.navigateToHome().then(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
      });
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  protected scrollToSection(sectionId: string): void {
    const scroll = () => {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    if (!this.isOnHomeRoute()) {
      this.routerService.navigateToHome().then(() => setTimeout(scroll, 100));
    } else {
      scroll();
    }
  }

}
