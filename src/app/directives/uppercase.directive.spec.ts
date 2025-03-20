import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';
import { FormControl, FormGroup, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <input type="text" appUppercase id="simple-input">
    <form [formGroup]="testForm">
      <input type="text" appUppercase formControlName="testControl" id="reactive-input">
    </form>
  `
})
class TestComponent {
  testForm = new FormGroup({
    testControl: new FormControl('')
  });
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let simpleInputElement: DebugElement;
  let reactiveInputElement: DebugElement;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UppercaseDirective, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    simpleInputElement = fixture.debugElement.query(By.css('#simple-input'));
    reactiveInputElement = fixture.debugElement.query(By.css('#reactive-input'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new UppercaseDirective({} as any, {} as any, {} as NgControl);
    expect(directive).toBeTruthy();
  });

  it('should convert input value to uppercase on simple input', () => {
    const inputValue = 'lowercase text';
    simpleInputElement.nativeElement.value = inputValue;
    simpleInputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(simpleInputElement.nativeElement.value).toBe(inputValue.toUpperCase());
  });

  it('should convert input value to uppercase on reactive form input', () => {
    const inputValue = 'lowercase text';
    reactiveInputElement.nativeElement.value = inputValue;
    reactiveInputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(reactiveInputElement.nativeElement.value).toBe(inputValue.toUpperCase());
    expect(component.testForm.get('testControl')?.value).toBe(inputValue.toUpperCase());
  });

  it('should handle empty input', () => {
    simpleInputElement.nativeElement.value = '';
    simpleInputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(simpleInputElement.nativeElement.value).toBe('');
  });

  it('should handle already uppercase input', () => {
    const inputValue = 'UPPERCASE TEXT';
    simpleInputElement.nativeElement.value = inputValue;
    simpleInputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(simpleInputElement.nativeElement.value).toBe(inputValue);
  });

  it('should not duplicate characters when typing', () => {

    const letters = 'hero';
    let currentText = '';

    for (const letter of letters) {
      currentText += letter;
      reactiveInputElement.nativeElement.value = currentText;
      reactiveInputElement.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    expect(reactiveInputElement.nativeElement.value).toBe('HERO');
    expect(component.testForm.get('testControl')?.value).toBe('HERO');
  });

  it('should maintain cursor position after transformation', () => {
    const inputEl = reactiveInputElement.nativeElement;
    inputEl.value = 'abc';
    inputEl.setSelectionRange(2, 2);

    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('ABC');
    expect(inputEl.selectionStart).toBe(2);
    expect(inputEl.selectionEnd).toBe(2);
  });
});
