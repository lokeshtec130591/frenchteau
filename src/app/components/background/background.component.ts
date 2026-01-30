import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animated-background">
      <svg class="floating-shape shape-1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#6366f1"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,75.1C26.4,81.2,11,80.8,-3.9,77.8C-18.8,74.8,-37.6,69.2,-51.8,59.6C-66,50,-75.6,36.4,-80.7,21.1C-85.8,5.8,-86.4,-11.2,-81.1,-26.3C-75.8,-41.4,-64.6,-54.6,-50.8,-61.9C-37,-69.2,-20.6,-70.6,-4.8,-73.8C11,-77,44.7,-76.4,44.7,-76.4Z"
          transform="translate(100 100)" />
      </svg>
      <svg class="floating-shape shape-2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#a855f7"
          d="M39.5,-65.6C51.4,-58.5,61.6,-47.8,68.2,-35.1C74.8,-22.4,77.8,-7.7,76.3,6.3C74.8,20.3,68.8,33.6,59.8,44.2C50.8,54.8,38.8,62.7,25.3,67.8C11.8,72.9,-3.2,75.2,-17.3,72.8C-31.4,70.4,-44.6,63.3,-55.2,53.1C-65.8,42.9,-73.8,29.6,-76.4,15.3C-79,-0.9,-76.2,-18.1,-68.9,-33C-61.6,-47.9,-49.8,-60.5,-36.3,-67C-22.8,-73.5,-7.6,-74,-0.3,-73.5C7,-73,39.5,-65.6,39.5,-65.6Z"
          transform="translate(100 100)" />
      </svg>
      <svg class="floating-shape shape-3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ec4899"
          d="M41.3,-71.8C54.4,-64.4,66.3,-54.5,73.5,-41.8C80.7,-29.1,83.2,-13.5,82.1,1.7C81,16.9,76.3,31.7,68.1,44.2C59.9,56.7,48.2,66.9,34.8,72.8C21.4,78.7,6.3,80.3,-8.5,77.8C-23.3,75.3,-37.8,68.7,-50.4,59.5C-63,50.3,-73.7,38.5,-78.8,24.8C-83.9,11.1,-83.4,-4.5,-78.2,-18.5C-73,-32.5,-63.1,-44.9,-50.8,-52.5C-38.5,-60.1,-23.8,-62.9,-10.1,-66.2C3.6,-69.5,28.2,-79.2,41.3,-71.8Z"
          transform="translate(100 100)" />
      </svg>
    </div>
  `,
  styles: []
})
export class BackgroundComponent {
  constructor(public languageService: LanguageService) { }
}
