import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserformComponent } from './project-userform.component';

describe('ProjectUserformComponent', () => {
  let component: ProjectUserformComponent;
  let fixture: ComponentFixture<ProjectUserformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUserformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
