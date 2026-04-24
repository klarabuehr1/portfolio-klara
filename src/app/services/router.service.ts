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

  navigateToImpressum(): Promise<boolean> {
    return this.#router.navigate([ROUTES.impressum]);
  }

  navigateToDatenschutz(): Promise<boolean> {
    return this.#router.navigate([ROUTES.datenschutz]);
  }
}
