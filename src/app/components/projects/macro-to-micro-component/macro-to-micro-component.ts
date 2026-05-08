import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
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
  private readonly routerService = inject(RouterService);

  @ViewChild('animationVideo') private readonly animationVideoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.animationVideoRef.nativeElement;
    video.load();
    video.play().catch(() => {});
  }

  protected navigateToWocy(): void { this.routerService.navigateToWocy(); }
  protected navigateToDryve(): void { this.routerService.navigateToDryve(); }
  protected navigateToSalt(): void { this.routerService.navigateToSalt(); }
}
