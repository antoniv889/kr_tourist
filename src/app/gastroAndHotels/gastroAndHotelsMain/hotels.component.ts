import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  images = ['hotel.jpg','restaurant.jpg']
  constructor(private dataService: DataService) { }
  categories:any = [];
  ngOnInit(){
    this.getCategories();
  }
  getCategories(){
    this.dataService.getCategories(4).subscribe(res=>{
      this.categories = res;
      console.log(this.categories);
    })
  }
}
