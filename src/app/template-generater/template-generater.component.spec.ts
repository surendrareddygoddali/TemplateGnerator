import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TemplateGeneraterComponent } from './template-generater.component';
import { TemplateService } from '../template.service';

describe('TemplateGeneraterComponent', () => {
  let component: TemplateGeneraterComponent;
  let fixture: ComponentFixture<TemplateGeneraterComponent>;
  let templateService: jasmine.SpyObj<TemplateService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TemplateService', ['saveTheme']);
    await TestBed.configureTestingModule({
      declarations: [ TemplateGeneraterComponent ],
      providers: [ { provide: TemplateService, useValue: spy } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGeneraterComponent);
    component = fixture.componentInstance;
    templateService = TestBed.inject(TemplateService) as jasmine.SpyObj<TemplateService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the image source when processFile is called', () => {
    const event = { target: { files: [ new File([], 'test.png') ] } };
    const reader = { readAsDataURL: () => {} };
    spyOn(window as any, 'FileReader').and.returnValue(reader);
    spyOn(reader, 'readAsDataURL');
    component.processFile(event);
    expect(reader.readAsDataURL).toHaveBeenCalledWith();
    expect(component.imageSrc).toBeTruthy();
  });

  it('should call saveTheme when saveTheme is called', () => {
    spyOn(templateService, 'saveTheme').and.returnValue({ item: () => {} } as any);
    component.saveTheme();
    expect(templateService.saveTheme).toHaveBeenCalled();
  });
});
