import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaUpdateComponent } from './ota-update.component';

describe('OtaUpdateComponent', () => {
  let component: OtaUpdateComponent;
  let fixture: ComponentFixture<OtaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtaUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
