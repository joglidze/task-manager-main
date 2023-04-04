import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEpicformComponent } from './project-epicform.component';

describe('ProjectEpicformComponent', () => {
  let component: ProjectEpicformComponent;
  let fixture: ComponentFixture<ProjectEpicformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEpicformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEpicformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
