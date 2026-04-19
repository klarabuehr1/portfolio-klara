import {Component, inject} from '@angular/core';
import {RouterService} from '../../app/services/router.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent {
  private routerService = inject(RouterService);
  protected readonly currentYear = new Date().getFullYear();

  protected navigateToImpressum() {
    this.routerService.navigateToImpressum();
  }
}
