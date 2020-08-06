import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gids',
  templateUrl: './gids.component.html',
  styleUrls: ['./gids.component.css']
})
export class GidsComponent implements OnInit {
  constructor(private dataService: DataService){
  }

  gids:any = [];
  gidImages:any = [];
  ngOnInit(){
    this.getGids();
  }

  getGids(){
    this.dataService.getGids().subscribe(res=>{
      this.gids = res;
      console.log(this.gids);
      for(let i = 0; i < this.gids.length; i++){
        this.dataService.getGid(this.gids[i].id).subscribe(response=>{
          this.gidImages[i] = response[1];

        })
      }
    })
  }
}
