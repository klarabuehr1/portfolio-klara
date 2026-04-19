import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PageContainerComponent} from '../../../shared/page-container-component/page-container-component';
import {ButtonComponent} from '../../../shared/button-component/button-component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PageContainerComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('projectsHeading') projectsHeading!: ElementRef<HTMLImageElement>;
  @ViewChild('letsWorkTogetherHeading') letsWorkTogetherHeading!: ElementRef<HTMLImageElement>;

  contactForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';

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
    this.updateWidth();
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

    el.style.width = `${10 + 200 * progress}%`;

    const svgHeight = el.offsetHeight;
    el.style.marginBottom = `-${svgHeight}/2px`;
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
}

