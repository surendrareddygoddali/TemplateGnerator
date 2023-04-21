import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set companyTitle to "UNT" on initialization', () => {
    expect(component.companyTitle).toBe('UNT');
  });

  it('should set the logoSrc input correctly', () => {
    component.logoSrc = 'test.png';
    fixture.detectChanges();
    const image = fixture.nativeElement.querySelector('img');
    expect(image.src).toContain('test.png');
  });

  it('should set the headerbackground input correctly', () => {
    component.headerbackground = 'red';
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('.header');
    expect(header.style.backgroundColor).toBe('red');
  });

  it('should set the actionColor input correctly', () => {
    component.actionColor = 'green';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.style.backgroundColor).toBe('green');
  });

  it('should set the backgroundImgSrc input correctly', () => {
    component.backgroundImgSrc = 'test.png';
    fixture.detectChanges();
    const body = fixture.nativeElement.querySelector('body');
    expect(body.style.backgroundImage).toContain('test.png');
  });

  it('should set the pageHeader input correctly', () => {
    component.pageHeader = 'Test Page';
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h1');
    expect(header.textContent).toBe('Test Page');
  });

  it('should set the companyTitle input correctly', () => {
    component.companyTitle = 'Test Company';
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.company-title');
    expect(title.textContent).toBe('Test Company');
  });
});
