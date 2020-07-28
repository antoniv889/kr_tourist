import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent implements OnInit {
  id: any;
  hotel:any=[];
  imgUrl:any;
  comments:any = [];
  author_id = localStorage.getItem('user_id');
  constructor(private activateRoute: ActivatedRoute, private dataService: DataService){
      this.id = activateRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    console.log(123);
    this.getPostById();
    this.getComment();
  }
  getPostById(){
    this.dataService.getPostById(this.id).subscribe(res=>{
      console.log(res);
      this.hotel = res[0];
      console.log(this.hotel);

      this.imgUrl = res[1];
      this.hotel = this.hotel[0];
      console.log(this.hotel);
    })
  }
  commentAuthor:any = [];

  getComment(){
    this.dataService.getComment(this.id).subscribe(res=>{
      // console.log(res);
      this.comments = res;
      for(let i=0; i<this.comments.length; i++){
        this.dataService.getCommentAuthor(this.comments[i].author_id).subscribe(response=>{
          this.commentAuthor[i] = response;
        })
      }
      console.log(this.commentAuthor);
    });
  }
  user_id = localStorage.getItem('user_id');

  addComment(form: NgForm){
    if(!this.user_id){
      alert('Ви не увійшли в аккаунт');
    } else {
    this.dataService.addComment(this.author_id, this.id, form.value.content)
      .subscribe(
        response =>{
          this.getComment()
        },
        error => console.log(error)
      )
    }
  }
}
