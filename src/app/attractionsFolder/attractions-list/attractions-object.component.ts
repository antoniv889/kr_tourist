import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-attractions-object',
  templateUrl: './attractions-object.component.html',
  styleUrls: ['./attractions-object.component.css']
})
export class AttractionsObjectComponent implements OnInit {
  id: any;
  type: number = 2;
  constructor(private activateRoute: ActivatedRoute,  private dataService: DataService){
      this.id = activateRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getPostByCategory();
    this.getUserLikes();
  }

  objects:any = [];
  routeImages: any = [];
  userLikes: any = [];
  postLikes: any = [];
  data: any = [];
  user_id = localStorage.getItem('user_id');
  getPostByCategory(){
    this.dataService.getPostByCategory(this.type,this.id).subscribe(res=>{
      this.objects = res;
      for(let i=0;i<this.objects.length;i++){
        this.dataService.getMediaUrl(this.objects[i].id).subscribe(res=>{
          this.routeImages[i] = res;
        });
        this.dataService.postlikes(this.objects[i].id).subscribe(res=>{
          this.data = res;
          this.postLikes[i] = this.data[this.data.length-1];
        });
      }
      console.log(this.postLikes);
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
