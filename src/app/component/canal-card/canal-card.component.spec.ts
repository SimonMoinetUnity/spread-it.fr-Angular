import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalCardComponent } from './canal-card.component';

describe('CanalCardComponent', () => {
  let component: CanalCardComponent;
  let fixture: ComponentFixture<CanalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanalCardComponent]
    });
    fixture = TestBed.createComponent(CanalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
