import {Component, inject, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {RouterService} from '../../app/services/router.service';
import {ROUTES} from '../../app/constants/routes';

const PROJECT_ROUTES = [ROUTES.macroToMicro, ROUTES.wocy, ROUTES.dryve, ROUTES.salt];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent {
  private routerService = inject(RouterService);
  private router = inject(Router);
  protected readonly currentYear = new Date().getFullYear();
  protected readonly isProjectPage = signal(false);

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        this.isProjectPage.set(PROJECT_ROUTES.some(r => url.includes(r)));
      });
  }

  protected navigateToImpressum() {
    this.routerService.navigateToImpressum();
  }

  protected navigateToDatenschutz() {
    this.routerService.navigateToDatenschutz();
  }
}
