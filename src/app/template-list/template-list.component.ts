import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  cssList: any;

  constructor(private templateService: TemplateService) {
    this.templateService.getTemplateSaved$.subscribe(value => {
      if(value === true){
        this.getThemes();
      }
    });
  }
  
  ngOnInit(): void {
    this.getThemes();
  }

  getThemes(): void {
    this.templateService.getThemes().subscribe(resp => {
      this.cssList = resp;
    });
  }

  applyTheme(theme: any): void {
    console.log("theme"+JSON.stringify);
    this.templateService.updateTemplateDetails(theme);
  }
}
