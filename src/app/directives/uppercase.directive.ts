import { Directive, HostListener, ElementRef, Renderer2, Self, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() @Self() private ngControl: NgControl
  ) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const value = this.el.nativeElement.value;
    const uppercaseValue = value.toUpperCase();


    if (value === uppercaseValue) {
      return;
    }

    const start = this.el.nativeElement.selectionStart;
    const end = this.el.nativeElement.selectionEnd;

    if (this.ngControl) {
      this.ngControl.control?.setValue(uppercaseValue, { emitEvent: false });
    }

    this.renderer.setProperty(this.el.nativeElement, 'value', uppercaseValue);
    this.el.nativeElement.setSelectionRange(start, end);
  }
}
