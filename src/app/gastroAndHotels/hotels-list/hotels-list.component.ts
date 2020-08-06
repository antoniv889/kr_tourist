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
  constructor(private activateRoute: ActivatedRoute, private dataService: DataService){
    this.id = activateRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getPostByCategory();

  }
  hotels:any = [];
  routeImages: any = [];
  userLikes: any = [];
  postLikes: any = [];
  data: any = [];
  user_id = localStorage.getItem('user_id');

  getPostByCategory(){
    this.dataService.getPostByCategory(4,this.id).subscribe(res=>{
      this.hotels = res;
      this.getUserLikes();
      console.log(this.hotels);
    })
  }
  userId:number = +this.user_id;
  lastLike:number;
  userpostLikes:any = [];
  likes: any = [];

  getUserLikes(){
    this.dataService.userlikes(this.userId).subscribe(res=>{
      this.userLikes = res;
      for(let i=0;i<this.hotels.length;i++){
        this.lastLike = 0;
        for(let j=0;j<this.userLikes.length;j++){
          console.log(this.hotels[i].id, this.userLikes);
          if(this.hotels[i].id === (+this.userLikes[j].post_id))this.lastLike++;
        }
        this.userpostLikes[i] = this.lastLike;
      }
    });


    this.dataService.getLikes().subscribe(res=>{
      this.likes = res;
      for(let i=0;i<this.hotels.length;i++){
        this.lastLike = 0;
        for(let j=0;j<this.likes.length;j++){
          if(this.hotels[i].id === (+this.likes[j].post_id))this.lastLike = +this.likes[j].count;
        }
        this.postLikes[i] = this.lastLike;
      }
    });
  }
  counter:number;
  numLikes:number = 0;

  userLikesPost(post_id:any, count:number, index:number){
    this.numLikes = 0;
    if(!this.user_id){
      alert('Ви не увійшли в аккаунт');
    } else {
      this.counter = +count;
      if(+this.userpostLikes[index]%2==0)this.counter++;
      else this.counter--;
      this.dataService.userlikespost(post_id, this.counter, this.user_id)
        .subscribe(
          response => {
            this.getUserLikes();
          },
          error => console.log(error)
        );
    }

  }
}
