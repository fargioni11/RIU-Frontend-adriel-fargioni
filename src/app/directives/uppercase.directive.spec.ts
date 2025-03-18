import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  template: '<input type="text" appUppercase>'
})
class TestComponent {
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [ UppercaseDirective ]
    });
    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new UppercaseDirective({} as any);
    expect(directive).toBeTruthy();
  });

  it('should convert input value to uppercase on input event', () => {
    const inputValue = 'lowercase text';
    inputElement.nativeElement.value = inputValue;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(inputElement.nativeElement.value).toBe(inputValue.toUpperCase());
  });

  it('should handle empty input', () => {
    inputElement.nativeElement.value = '';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(inputElement.nativeElement.value).toBe('');
  });

  it('should handle already uppercase input', () => {
    const inputValue = 'UPPERCASE TEXT';
    inputElement.nativeElement.value = inputValue;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    expect(inputElement.nativeElement.value).toBe(inputValue);
  });
});
