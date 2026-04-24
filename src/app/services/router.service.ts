import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTES} from '../constants/routes';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  readonly #router = inject(Router);

  navigateToHome(): Promise<boolean> {
    return this.#router.navigate([ROUTES.home]);
  }

  navigateToProjects(): Promise<boolean> {
    return this.#router.navigate([ROUTES.projects]);
  }

  navigateToMacroToMicro(): Promise<boolean> {
    return this.#router.navigate([ROUTES.macroToMicro]);
  }

  navigateToWocy(): Promise<boolean> {
    return this.#router.navigate([ROUTES.wocy]);
  }

  navigateToDryve(): Promise<boolean> {
    return this.#router.navigate([ROUTES.dryve]);
  }

  navigateToSalt(): Promise<boolean> {
    return this.#router.navigate([ROUTES.salt]);
  }

  navigateToAbout(): Promise<boolean> {
    return this.#router.navigate([ROUTES.about]);
  }

  navigateToCV(): Promise<boolean> {
    return this.#router.navigate([ROUTES.cv]);
  }

  navigateToContact(): Promise<boolean> {
    return this.#router.navigate([ROUTES.contact]);
  }

  navigateToSettings(): Promise<boolean> {
    return this.#router.navigate([ROUTES.settings]);
  }

  navigateToImpressum(): Promise<boolean> {
    return this.#router.navigate([ROUTES.impressum]);
  }

  navigateToDatenschutz(): Promise<boolean> {
    return this.#router.navigate([ROUTES.datenschutz]);
  }
}
