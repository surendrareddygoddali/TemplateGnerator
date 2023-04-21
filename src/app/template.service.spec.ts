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

  describe('saveTheme', () => {
    it('should make a POST request to save the theme', () => {
      const mockTheme = { name: 'Test Theme', colors: ['#000000', '#FFFFFF'] };
      service.saveTheme(mockTheme).subscribe((response) => {
        expect(response).toEqual(mockTheme);
      });
      const req = httpMock.expectOne('http://localhost:8081/api/saveTheme');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockTheme);
      req.flush(mockTheme);
    });
  });

  describe('getThemes', () => {
    it('should make a GET request to retrieve themes', () => {
      const mockThemes = [
        { name: 'Theme 1', colors: ['#123456', '#abcdef'] },
        { name: 'Theme 2', colors: ['#789012', '#fedcba'] }
      ];
      service.getThemes().subscribe((response) => {
        expect(response).toEqual(mockThemes);
      });
      const req = httpMock.expectOne('http://localhost:8081/api/getThemes');
      expect(req.request.method).toBe('GET');
      req.flush(mockThemes);
    });
  });
});
