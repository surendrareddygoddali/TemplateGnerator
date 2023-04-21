import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() logoSrc: String = '../../assets/logo.png';
  @Input() headerbackground: string = '';
  @Input() actionColor: string = '';
  @Input() backgroundImgSrc: String = '';
  @Input() pageHeader: string = '';
  @Input() companyTitle: string = '';
  ngOnInit(): void {
    console.log("on preview initialization"+ this.logoSrc);
    this.companyTitle = 'UNT';
  }

}
