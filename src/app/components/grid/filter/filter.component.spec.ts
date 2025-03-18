import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { filterComponent } from './filter.component';
import { By } from '@angular/platform-browser';


describe('filterComponent', () => {
  let component: filterComponent;
  let fixture: ComponentFixture<filterComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        filterComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(filterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default label and placeholder if not provided', () => {
    expect(component.label()).toBe('Filter');
    expect(component.placeholder()).toBe('Ex : Superman');
  });

  it('should set label and placeholder from input', () => {
    fixture.componentRef.setInput('label', 'Search');
    fixture.componentRef.setInput('placeholder', 'Enter text here');
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('mat-label'));
    expect(labelElement.nativeElement.textContent).toBe('Search');
    expect(inputElement.placeholder).toBe('Enter text here');
  });

  it('should update filter model on input change', () => {
    const testValue = 'test input';
    let emittedValue: string | undefined;

    const subscription = component.filterChange.subscribe(value => {
      emittedValue = value;
    });

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emittedValue).toBe(testValue);
    subscription.unsubscribe();
  });

  it('should bind the filter model to the input value', () => {
    const initialValue = 'initial value';

    fixture.componentRef.setInput('filter', initialValue);
    fixture.detectChanges();

    expect(component.filter()).toBe(initialValue);
  });
});
