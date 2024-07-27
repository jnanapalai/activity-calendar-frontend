import { Component, Input } from '@angular/core';


export interface Slide {
  imgSrc: string;
  imgAlt: string;
}

@Component({
  selector: 'app-summaryslider',
  templateUrl: './summaryslider.component.html',
  styleUrl: './summaryslider.component.css'
})
export class SummarysliderComponent {

  @Input() images: Slide[] = [];
  selectedIndex = 0;

  showPrev(i:number) {
    if (this.selectedIndex > 0) {
      this.selectedIndex = i-1;
    }
  }

  showNext(i: number) {
    if (this.selectedIndex < this.images.length -1) {
      this.selectedIndex = i + 1;
    }
  }

}
