import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPostByCategory();
  }
  events:any = [];
  eventImages: any = [];
  userLikes: any = [];
  userpostLikes:any = [];
  postLikes: any = [];
  data: any = [];
  user_id = localStorage.getItem('user_id');
  getPostByCategory(){
    this.dataService.getPostList(5).subscribe(res=>{
      this.events = res;
      this.getUserLikes();
      console.log(this.eventImages);
    })
  }
  likes: any = [];
  userId:number = +this.user_id;
  lastLike:number;
  getUserLikes(){
    this.dataService.userlikes(this.userId).subscribe(res=>{
      this.userLikes = res;
      for(let i=0;i<this.events.length;i++){
        this.lastLike = 0;
        for(let j=0;j<this.userLikes.length;j++){
          console.log(this.events[i].id, this.userLikes);
          if(this.events[i].id === (+this.userLikes[j].post_id))this.lastLike++;
        }
        this.userpostLikes[i] = this.lastLike;
      }
    });


    this.dataService.getLikes().subscribe(res=>{
      this.likes = res;
      for(let i=0;i<this.events.length;i++){
        this.lastLike = 0;
        for(let j=0;j<this.likes.length;j++){
          if(this.events[i].id === (+this.likes[j].post_id))this.lastLike = +this.likes[j].count;
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
