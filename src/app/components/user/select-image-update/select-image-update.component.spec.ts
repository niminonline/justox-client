import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImageUpdateComponent } from './select-image-update.component';

describe('SelectImageUpdateComponent', () => {
  let component: SelectImageUpdateComponent;
  let fixture: ComponentFixture<SelectImageUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectImageUpdateComponent]
    });
    fixture = TestBed.createComponent(SelectImageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
