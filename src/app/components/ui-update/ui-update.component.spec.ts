import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUpdateComponent } from './ui-update.component';

describe('UiUpdateComponent', () => {
  let component: UiUpdateComponent;
  let fixture: ComponentFixture<UiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
