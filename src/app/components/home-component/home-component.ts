import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {PageContainerComponent} from '../../../shared/page-container-component/page-container-component';
import {ButtonComponent} from '../../../shared/button-component/button-component';

@Component({
  selector: 'app-home',
  imports: [PageContainerComponent, ButtonComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('projectsHeading') projectsHeading!: ElementRef<HTMLImageElement>;
  @ViewChild('letsWorkTogetherHeading') letsWorkTogetherHeading!: ElementRef<HTMLImageElement>;

  ngAfterViewInit() {
    this.updateWidth();
    // Small delay to ensure image is loaded before measuring
    setTimeout(() => this.updateWidth(), 100);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateWidth() {
    this.updateSVGWidth(this.projectsHeading?.nativeElement);
    this.updateSVGWidth(this.letsWorkTogetherHeading?.nativeElement);
  }

  private updateSVGWidth(el: HTMLImageElement | undefined) {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight * 0.9)));

    // 100% = full container content width (between paddings), always correct at any screen size
    el.style.width = `${10 + 200 * progress}%`;

    // Measure the SVG height and apply negative margin-bottom to prevent layout shift
    const svgHeight = el.offsetHeight;
    el.style.marginBottom = `-${svgHeight}/2px`;
  }
}

