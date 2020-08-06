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
  constructor(private activateRoute: ActivatedRoute,  private dataService: DataService){
      this.id = activateRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getPostByCategory();

  }

  objects:any = [];
  routeImages: any = [];
  likes: any = [];
  postLikes: any = [];
  userLikes: any = [];
  data: any = [];
  user_id = localStorage.getItem('user_id');
  userpostLikes:any = [];
  getPostByCategory(){
    this.dataService.getPostByCategory(3,this.id).subscribe(res=>{
      this.objects = res;
      this.getUserLikes();
    });
  }
  userId:number = +this.user_id;
  lastLike:number;
  counter:number;
  numLikes:number = 0;
  getUserLikes(){
    this.dataService.userlikes(this.userId).subscribe(res=>{
      this.userLikes = res;
      for(let i=0;i<this.objects.length;i++){
        this.lastLike = 0;
        for(let j=0;j<this.userLikes.length;j++){
          console.log(this.objects[i].id, this.userLikes);
          if(this.objects[i].id === (+this.userLikes[j].post_id))this.lastLike++;
        }
        this.userpostLikes[i] = this.lastLike;
      }
    });

    this.dataService.getLikes().subscribe(res=>{
      this.likes = res;
      for(let i=0;i<this.objects.length;i++){
        this.lastLike = 0;
        for(let j=0;j<this.likes.length;j++){
          if(this.objects[i].id === (+this.likes[j].post_id))this.lastLike = +this.likes[j].count;
        }
        this.postLikes[i] = this.lastLike;
      }
    });
  }


  userLikesPost(post_id:any, count:number, index:number){
    this.numLikes = 0;
    if(!this.user_id){
      alert('Ви не увійшли в аккаунт');
    } else {
      this.counter = +count;
      if(+this.postLikes[index]%2==0)this.counter++;
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
