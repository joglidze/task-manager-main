import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIssuetypesComponent } from './project-issuetypes.component';

describe('ProjectIssuetypesComponent', () => {
  let component: ProjectIssuetypesComponent;
  let fixture: ComponentFixture<ProjectIssuetypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectIssuetypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectIssuetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
