import { Directive, HostListener, ElementRef } from '@angular/core';


@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
  }

}
