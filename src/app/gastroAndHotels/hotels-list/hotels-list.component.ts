import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {

  id: any;
  type: number = 3;
  constructor(private activateRoute: ActivatedRoute, private dataService: DataService){
    this.id = activateRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getPostByCategory();
    this.getUserLikes();

  }
  hotels:any = [];
  routeImages: any = [];
  userLikes: any = [];
  postLikes: any = [];
  data: any = [];
  user_id = localStorage.getItem('user_id');

  getPostByCategory(){
    this.dataService.getPostByCategory(this.type,this.id).subscribe(res=>{
      this.hotels = res;
      for(let i=0;i<this.hotels.length;i++){
        this.dataService.getMediaUrl(this.hotels[i].id).subscribe(res=>{
          this.routeImages[i] = res;
        });
      }
      console.log(this.hotels);
    })
  }
  userId:number = +this.user_id;
  getUserLikes(){
    console.log(this.userId);
    this.dataService.userlikes(this.userId).subscribe(res=>{
      this.userLikes = res;
      console.log(this.userLikes);
    });
  }
  counter:number;
  numLikes:number = 0;
  xpost_id:number;
  userLikesPost(post_id:any, count:any){
    if(!this.user_id){
      alert('Ви не увійшли в аккаунт');
    } else {
    this.getUserLikes();
    console.log(post_id);
    console.log(count);
    this.counter = +count;

    for(let i = 0; i < this.userLikes.length; i++){
      if(this.userLikes[i].post_id == post_id){
        this.numLikes++;
      }
    }
    if(this.numLikes%2!=0){
      this.counter-=2;
    }
    this.counter++;

    this.dataService.userlikespost(post_id, this.counter, this.user_id)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    }
  }
}
