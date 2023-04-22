import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TemplateService]
    });
    service = TestBed.inject(TemplateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call saveTheme API', () => {
    const body = {themeName: 'Test Theme'};
    service.saveTheme(body).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8081/api/createTheme');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Access-Control-Allow-Origin')).toBe('*');
    req.flush(body);
  });

  it('should call getThemes API', () => {
    const mockResponse = [{"themeName":"1"},{"themeName":"2"}];
    service.getThemes().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/getThemes');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBeNull();
    expect(req.request.headers.get('Access-Control-Allow-Origin')).toBeNull();
    req.flush(mockResponse);
  });

  it('should update template details', () => {
    const mockDetails = [{"themeName":"1"},{"themeName":"2"},{"themeName":"3"}];
    service.updateTemplateDetails(mockDetails);
    service.templateDetails$.subscribe(res => {
      expect(res).toEqual(mockDetails);
    });
  });

  it('should update template saved flag', () => {
    const mockFlag = false;
    service.updateTemplateSaved(mockFlag);
    service.getTemplateSaved$.subscribe(res => {
      expect(res).toEqual(mockFlag);
    });
  });
});
