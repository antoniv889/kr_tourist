import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgModel} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css']
})
export class AttractionsComponent implements OnInit {

  constructor(private dataService: DataService) { }
  categories:any = [];

  ngOnInit(){
    this.getCategories();
  }
  getCategories(){
    this.dataService.getCategories(2).subscribe(res=>{
      this.categories = res;
      console.log(this.categories);
    })
  }

}
