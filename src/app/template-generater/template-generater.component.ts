import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-template-generater',
  templateUrl: './template-generater.component.html',
  styleUrls: ['./template-generater.component.css']
})
export class TemplateGeneraterComponent {
  primaryColor: string = '#814582';
  actionColor: string = '#4fa155';
  pageTitle: string = 'Change your title';
  selectedFile!: ImageSnippet;
  imageSrc: string = '../../assets/logo.png';
  templateName: string = '';
  companyTitle: string = '';

  saveSuccess: boolean = false;
  choosenFile!: File;

  constructor(private templateService: TemplateService) {
    this.templateService.templateDetails$.subscribe(value => {
      this.primaryColor = value.css.primaryColor;
      this.actionColor = value.css.actionColor;
      this.companyTitle = value.css.companyTitle;
      this.templateName = value.themeName;
      this.pageTitle = value.css.pageTitle;
      this.imageSrc =  value.css.imageSrc;
    });
  }

  processFile(imageInput: any): void {
    console.log("inside process file" + imageInput)
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageSrc = this.selectedFile.src;

      this.selectedFile.pending = true;
    });

    reader.readAsDataURL(file);

    this.choosenFile = imageInput.files[0];
    
  }

  saveTheme(): void {
    this.saveSuccess = false;
    const css = {
      "pageTitle": this.pageTitle,
      "companyTitle": this.companyTitle,
      "primaryColor": this.primaryColor,
      "actionColor": this.actionColor,
      "imageSrc": this.imageSrc
    }
    const data = {
      "themeName": this.templateName,
      "css": css
    }

    // const uploadImageData = new FormData();
    // uploadImageData.append('imageFile', this.choosenFile, this.choosenFile.name);

    this.templateService.saveTheme(data).subscribe(resp => {
      if(resp.Save) {
        this.saveSuccess = true;
        this.templateService.updateTemplateSaved(true);
      }
    });
  }

}
