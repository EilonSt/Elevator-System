import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPanelComponent } from './setup-panel.component';

describe('SetupPanelComponent', () => {
  let component: SetupPanelComponent;
  let fixture: ComponentFixture<SetupPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
