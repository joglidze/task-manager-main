import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesformComponent } from './rolesform.component';

describe('RolesformComponent', () => {
  let component: RolesformComponent;
  let fixture: ComponentFixture<RolesformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
