import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[roundedIcon]',
})
export class RoundedIconDirective {
  private elementRef: ElementRef;
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  
  ngOnInit() {
    const commonIcon = this.elementRef.nativeElement.querySelector(".common-icon");
    if (commonIcon) {
      commonIcon.classList.add("rounded");
    }
  }
}
