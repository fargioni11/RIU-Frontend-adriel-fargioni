import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SuperheroService } from '../../services/superhero.service';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { filterComponent } from './filter/filter.component';
import { of } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

const mockSuperheroService = {
  deleteSuperhero: jasmine.createSpy('deleteSuperhero').and.returnValue(of({})),
};

const mockModalService = {
  openModal: jasmine.createSpy('openModal').and.returnValue({
    afterClosed: () => of(true),
  }),
};

interface TestData {
  id: number;
  name: string;
  power: string;
  actions: string;
  age: number;
}

@Component({
  template: `<app-grid
                [displayedColumns]="columns"
                [data]="testData"
                (superheroDeleted)="onSuperheroDeleted()"
                (superheroAdded)="onSuperheroAdded()"
                (superheroEdited)="onSuperheroEdited()"
                [sortableColumns]="sortable"
              ></app-grid>`,
  standalone: true,
  imports: [GridComponent, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatSortModule, filterComponent, ],
})
class TestGridContainerComponent {
  columns: string[] = ['id', 'name', 'power', 'actions'];
  testData: TestData[] = [
    { id: 1, name: 'Superman', power: 'Flight', actions: 'Save the world', age: 30 },
    { id: 2, name: 'Batman', power: 'Intelligence', actions: 'Fight crime', age: 35 },
  ];
  sortable: string[] = ['name', 'power'];
  superheroDeletedSpy = jasmine.createSpy('onSuperheroDeleted');
  superheroAddedSpy = jasmine.createSpy('onSuperheroAdded');
  superheroEditedSpy = jasmine.createSpy('onSuperheroEdited');

  onSuperheroDeleted() {
    this.superheroDeletedSpy();
  }
  onSuperheroAdded() {
    this.superheroAddedSpy();
  }
  onSuperheroEdited() {
    this.superheroEditedSpy();
  }
}

describe('GridComponent', () => {
  let component: GridComponent<TestData>;
  let fixture: ComponentFixture<TestGridContainerComponent>;
  let testContainerComponent: TestGridContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatSortModule,
        NoopAnimationsModule,
        filterComponent,
        GridComponent,
      ],
      providers: [
        provideHttpClient(),
        { provide: SuperheroService, useValue: mockSuperheroService },
        { provide: ModalService, useValue: mockModalService },
      ],
    }).compileComponents();

    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as SweetAlertResult));

    fixture = TestBed.createComponent(TestGridContainerComponent);
    testContainerComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance as GridComponent<TestData>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource with provided data', () => {
    expect(component.dataSource.data).toEqual(testContainerComponent.testData);
  });

  it('should set displayedColumns from input', () => {
    expect(component.displayedColumns()).toEqual(testContainerComponent.columns);
  });

  it('should initialize sortableColumns from input', () => {
    expect(component.sortableColumns()).toEqual(testContainerComponent.sortable);
  });

  it('should filter dataSource when valueToFilter signal changes', () => {
    component.valueToFilter.set('superman');
    fixture.detectChanges();
    expect(component.dataSource.filter).toBe('superman');
  });

  it('should clear filter when valueToFilter signal is empty', () => {
    component.valueToFilter.set('superman');
    component.valueToFilter.set('');
    expect(component.dataSource.filter).toBe('');
  });

  it('should emit superheroDeleted event when deleteSuperhero is called and confirmed', async () => {
    const idToDelete = 1;

    component.deleteSuperhero(idToDelete);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(Swal.fire).toHaveBeenCalled();
    expect(mockSuperheroService.deleteSuperhero).toHaveBeenCalledWith(idToDelete);
    expect(testContainerComponent.superheroDeletedSpy).toHaveBeenCalled();
  });

  it('should open modal for editing when editSuperhero is called', () => {
    const dataToEdit = testContainerComponent.testData[0];
    component.editSuperhero(dataToEdit);
    expect(mockModalService.openModal).toHaveBeenCalledWith(ModalComponent, { data: dataToEdit, isEdit: true });
  });


  it('should not emit superheroEdited event when edit modal is closed without a result', async () => {
    (mockModalService.openModal as jasmine.Spy).and.returnValue({ afterClosed: () => of(null) });
    const dataToEdit = testContainerComponent.testData[0];
    component.editSuperhero(dataToEdit);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(testContainerComponent.superheroEditedSpy).not.toHaveBeenCalled();
  });

  it('should set the paginator for the dataSource', () => {
    fixture.detectChanges();
    expect(component.dataSource.paginator).toBeDefined();
  });
});
