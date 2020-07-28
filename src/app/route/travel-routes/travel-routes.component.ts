import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-travel-routes',
  templateUrl: './travel-routes.component.html',
  styleUrls: ['./travel-routes.component.css']
})

export class TravelRoutesComponent implements OnInit {

  constructor(private dataService: DataService){
  }
  categories:any = [];

  ngOnInit(){
    this.getCategories();
  }
  getCategories(){
    this.dataService.getCategories(1).subscribe(res=>{
      this.categories = res;
      console.log(this.categories);
    })
  }
}
