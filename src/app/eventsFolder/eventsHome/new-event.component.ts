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
    this.getUserLikes();
  }
  events:any = [];
  eventImages: any = [];
  userLikes: any = [];
  postLikes: any = [];
  data: any = [];
  user_id = localStorage.getItem('user_id');
  getPostByCategory(){
    this.dataService.getPostList(6).subscribe(res=>{
      this.events = res;
      for(let i=0;i<this.events.length;i++){
        this.dataService.getMediaUrl(this.events[i].id).subscribe(res=>{
          this.eventImages[i] = res;
        });
        this.dataService.postlikes(this.events[i].id).subscribe(res=>{
          this.data = res;
          this.postLikes[i] = this.data[this.data.length-1];
        });
      }
      console.log(this.eventImages);
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
