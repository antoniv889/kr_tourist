import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-route-review-page',
  templateUrl: './route-review-page.component.html',
  styleUrls: ['./route-review-page.component.css']
})
export class RouteReviewPageComponent implements OnInit {
  id: any;
  imgUrl: any;
  // origin = { lat: 48.654763, lng: 22.284592  };
  // destination = { lat: 48.607798, lng: 22.329911};
  counter = 0;
  author_id = localStorage.getItem('user_id');
  data: any;
  constructor(private activateRoute: ActivatedRoute, private dataService: DataService){
      this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getPostById();
    // this.getPointsById();
    this.getComment();
    this.getRouteObjects();
  }



  icon = "assets/img/marker.png";
  route:any = {};
  routePoints:any = [];
  comments:any = [];
  commentAuthor:any = [];
  dataObjects:any = [];
  excursions:any = [];



  getPostById(){
    this.dataService.getPostById(this.id).subscribe(res=>{
      // console.log(res);
      this.route = res[0];
      this.imgUrl = res[1];
      this.route = this.route[0];
    })
  }
  lat:number;
  lng:number;
  // getPointsById(){
  //   this.dataService.getPointsById(this.id).subscribe(res=>{
  //     this.routePoints = res;
  //     this.lat = +this.routePoints[0].latitude;
  //     this.lng = +this.routePoints[0].longitude;
  //   })
  // }
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
  rid:number;
  latitude:any = [];
  point_visited:any = [];
  longitude:any = [];
  getRouteObjects(){
    this.dataService.getRouteObjects(this.id).subscribe(res=>{
      this.data = res;
      console.log('------------------------');
      console.log(res);
      console.log('////////////////////////')

      for(let i = 0; i<this.data.length;i++){
        this.rid = this.data[i].attraction_id;
        this.dataService.getPostById(this.rid).subscribe(response=>{
          this.excursions[i] = response;
          console.log( this.excursions[i]);
          this.latitude[i] = +this.excursions[i][0][0].latitude;
          this.longitude[i] = +this.excursions[i][0][0].longitude;
          this.point_visited[i] = 0;
        });
      }
      console.log(this.latitude[0]);
      console.log(this.longitude);

    });
  }
  fun(point_id: number){
    this.counter++;
    console.log(point_id+1);
    for(let i = 0; i<this.point_visited.length;i++){
      this.point_visited[i] = 0;
    }
    if(this.counter>this.point_visited.length) this.point_visited[point_id] = 1;
    if(this.counter===this.routePoints.length)this.point_visited[0] = 1;
    console.log(this.point_visited[point_id]);
  }

}
