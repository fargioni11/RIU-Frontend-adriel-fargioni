import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { GridComponent } from '../../../components/grid/grid.component';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { SuperheroService } from '../../../services/superhero.service';
import { ModalService } from '../../../services/modal.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Superhero } from '../../../models/superhero.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventEmitter, Output, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockSuperheroService = {
  getAllSuperhero: jasmine.createSpy('getAllSuperhero').and.returnValue(of([
    { id: 1, name: 'Superman', power: 'Flight', age: '30', actions: '' },
    { id: 2, name: 'Batman', power: 'Intelligence', age: '40', actions: '' },
  ])),
  deleteSuperhero: jasmine.createSpy('deleteSuperhero').and.returnValue(of({})),
};

const mockModalService = {
  openModal: jasmine.createSpy('openModal').and.returnValue({
    afterClosed: () => of(true),
    componentInstance: {},
    close: jasmine.createSpy('close'),
  } as any),
};

@Component({
  selector: 'app-modal',
  template: '',
  standalone: true,
})
class MockModalComponent {}

@Component({
  selector: 'app-toolbar',
  template: '',
  standalone: true,
  outputs: ['addSuperheroEvent'],
})
class MockToolbarComponent {
  addSuperheroEvent = new EventEmitter<void>();
}

@Component({
  selector: 'app-grid',
  template: '',
  standalone: true,
  inputs: ['displayedColumns', 'data', 'sortableColumns'],
  outputs: ['superheroDeleted', 'superheroAdded', 'superheroEdited'],
})
class MockGridComponent {
  displayedColumns: string = '';
  data: Superhero | null = null;
  sortableColumns: string[] = [];
  superheroDeleted = new EventEmitter<void>();
  superheroAdded = new EventEmitter<void>();
  superheroEdited = new EventEmitter<void>();
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let superheroService: jasmine.SpyObj<SuperheroService>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const superheroServiceSpy = jasmine.createSpyObj('SuperheroService', ['getAllSuperhero', 'deleteSuperhero']);
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['openModal']);

    await TestBed.configureTestingModule({
      imports: [
        ListComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: SuperheroService, useValue: superheroServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },
      ],
    })
      .overrideComponent(ListComponent, {
        remove: { imports: [GridComponent, ToolbarComponent, ModalComponent] },
        add: { imports: [MockGridComponent, MockToolbarComponent, MockModalComponent] },
      })
      .compileComponents();

    superheroService = TestBed.inject(SuperheroService) as jasmine.SpyObj<SuperheroService>;
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;

    superheroService.getAllSuperhero.and.returnValue(of([
      { id: 1, name: 'Superman', power: 'Flight', age: '30', actions: '' },
      { id: 2, name: 'Batman', power: 'Intelligence', age: '40', actions: '' },
    ]));
    modalService.openModal.and.returnValue({
      afterClosed: () => of(true),
      componentInstance: {},
      close: jasmine.createSpy('close'),
    } as any);

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllSuperhero on ngOnInit', () => {
    expect(superheroService.getAllSuperhero).toHaveBeenCalled();
  });

  it('should set superheroes signal with data from getAllSuperhero', () => {
    expect(component.superheroes()).toEqual([
      { id: 1, name: 'Superman', power: 'Flight', age: '30', actions: '' },
      { id: 2, name: 'Batman', power: 'Intelligence', age: '40', actions: '' },
    ]);
  });

  it('should call getAllSuperhero when superheroDeleted output emits', () => {
    fixture.detectChanges();
    const gridComponent = fixture.debugElement.query(By.directive(MockGridComponent)).componentInstance as MockGridComponent;
    gridComponent.superheroDeleted.emit();
    expect(superheroService.getAllSuperhero).toHaveBeenCalledTimes(2);
  });

  it('should call getAllSuperhero when superheroAdded output emits', () => {
    fixture.detectChanges();
    const gridComponent = fixture.debugElement.query(By.directive(MockGridComponent)).componentInstance as MockGridComponent;
    gridComponent.superheroAdded.emit();
    expect(superheroService.getAllSuperhero).toHaveBeenCalledTimes(2);
  });

  it('should call getAllSuperhero when superheroEdited output emits', () => {
    fixture.detectChanges();
    const gridComponent = fixture.debugElement.query(By.directive(MockGridComponent)).componentInstance as MockGridComponent;
    gridComponent.superheroEdited.emit();
    expect(superheroService.getAllSuperhero).toHaveBeenCalledTimes(2);
  });

it('should open add superhero modal when addSuperheroEvent emits from toolbar', () => {
  fixture.detectChanges();
  const toolbarComponent = fixture.debugElement.query(By.directive(MockToolbarComponent)).componentInstance as MockToolbarComponent;
  toolbarComponent.addSuperheroEvent.emit();
  expect(modalService.openModal).toHaveBeenCalled();
  expect(modalService.openModal).toHaveBeenCalledWith(
      jasmine.any(Function),
      { data: {} as Superhero, isEdit: false }
  );
});

  it('should call getAllSuperhero after add superhero modal is closed with a result', () => {
    fixture.detectChanges();
    const toolbarComponent = fixture.debugElement.query(By.directive(MockToolbarComponent)).componentInstance as MockToolbarComponent;
    toolbarComponent.addSuperheroEvent.emit();
    expect(superheroService.getAllSuperhero).toHaveBeenCalledTimes(2);
  });

  it('should not call getAllSuperhero after add superhero modal is closed without a result', () => {
    fixture.detectChanges();
    modalService.openModal.and.returnValue({
      afterClosed: () => of(null),
      componentInstance: {},
      close: jasmine.createSpy('close'),
    } as any);

    const toolbarComponent = fixture.debugElement.query(By.directive(MockToolbarComponent)).componentInstance as MockToolbarComponent;
    toolbarComponent.addSuperheroEvent.emit();
    expect(superheroService.getAllSuperhero).toHaveBeenCalledTimes(1);
  });
});
