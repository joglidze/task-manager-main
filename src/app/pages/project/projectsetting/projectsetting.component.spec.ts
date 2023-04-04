import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsettingComponent } from './projectsetting.component';

describe('ProjectsettingComponent', () => {
  let component: ProjectsettingComponent;
  let fixture: ComponentFixture<ProjectsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
