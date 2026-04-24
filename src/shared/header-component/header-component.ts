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

  private routerService = inject(RouterService);
  private router = inject(Router);

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
    if (!this.isOnHomeRoute()) {
      this.useLightNavLinks = false;
      return;
    }

    const heroPlaceholder = document.querySelector('.home-image-placeholder') as HTMLElement | null;
    if (!heroPlaceholder) {
      this.useLightNavLinks = false;
      return;
    }

    const placeholderRect = heroPlaceholder.getBoundingClientRect();
    const headerBottom = this.headerElement?.nativeElement.getBoundingClientRect().bottom ?? 64;

    this.useLightNavLinks = placeholderRect.top < headerBottom && placeholderRect.bottom > 0;
  }

  private isOnHomeRoute(): boolean {
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

  protected navigateToProjects() {
    this.routerService.navigateToProjects();
  }

  protected navigateToAbout() {
    this.routerService.navigateToAbout();
  }

  protected navigateToCV() {
    this.routerService.navigateToCV();
  }

  protected navigateToContact() {
    this.routerService.navigateToContact();
  }

  protected navigateToSettings() {
    this.routerService.navigateToSettings();
  }

}
