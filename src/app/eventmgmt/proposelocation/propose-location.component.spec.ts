
import { TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { CreateProjectComponent } from './create-project.component';
import { ProjectService } from '../../services/project.service';
import { MessageService } from '../../services/message.service';
 
describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let formBuilder: FormBuilder;
  let projectService: jasmine.SpyObj<ProjectService>; 
  let messageService: jasmine.SpyObj<MessageService>; 

  beforeEach(async () => {
    const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['']); 
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['']); 

    await TestBed.configureTestingModule({
      declarations: [CreateProjectComponent],
      providers: [
        FormBuilder,
        { provide: ProjectService, useValue: projectServiceSpy }, 
        { provide: MessageService, useValue: messageServiceSpy } 
      ]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    const formGroup = formBuilder.group({
      projectUsers: formBuilder.array(['User 1', 'User 2'])
    });

    component = new CreateProjectComponent(formBuilder, projectServiceSpy, messageServiceSpy); 
    component.projectForm = formGroup;
    projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>; 
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>; 
  });

  it('should remove the last project user from the form array', () => {
    component.removeLastProjectUser();
    const projectUsers = component.projectForm.get('projectUsers') as FormArray;
    expect(projectUsers.length).toBe(1);
  });

  it('should not remove any project user if the form array is empty', () => {
    const projectUsers = component.projectForm.get('projectUsers') as FormArray;
    while (projectUsers.length > 0) {
      projectUsers.removeAt(0);
    }
    component.removeLastProjectUser();
    expect(projectUsers.length).toBe(0);
  });
});
