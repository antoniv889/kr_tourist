import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-gid-page',
  templateUrl: './gid-page.component.html',
  styleUrls: ['./gid-page.component.css']
})
export class GidPageComponent implements OnInit {
  id: any;
  imgUrl: any;
  author_id = localStorage.getItem('user_id');
  user_id = localStorage.getItem('user_id');

  comments:any = [];

  commentAuthor:any = [];

  constructor(private activateRoute: ActivatedRoute, private dataService: DataService){
      this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPostById();
    this.getComment();
  }
  gid:any = [];

  getPostById(){
    this.dataService.getGid(this.id).subscribe(res=>{
      console.log(res);
      this.gid = res[0];
      this.imgUrl = res[1];
      this.gid = this.gid[0];
    })
  }

  getComment(){
    this.dataService.getComment(this.id).subscribe(res=>{
      // console.log(res);
      this.comments = res;
      for(let i=0; i<this.comments.length; i++){
        this.dataService.getCommentAuthor(this.comments[i].author_id).subscribe(response=>{
          this.commentAuthor[i] = response;
        })
      }
      console.log(this.comments);

      console.log(this.commentAuthor);
    });
  }
  addComment(form: NgForm){
    if(!this.user_id){
      alert('Ви не увійшли в аккаунт');
    } else {
    this.dataService.addComment(this.author_id, this.id, form.value.content)
      .subscribe(
        response =>{
          this.getComment();
        },
        error => console.log(error)
      )
    }
  }

}
