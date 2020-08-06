import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-route-review',
  templateUrl: './route-review.component.html',
  styleUrls: ['./route-review.component.css'],
  styles: [`
    /deep/ .carousel-control-next:hover{
      background-color: #0000004d;
    }
    /deep/ .carousel-control-next{
      width:150px;
      z-index: 100;
    }

    /deep/ .carousel-control-prev:hover{
      background-color: #0000004d;
    }
    /deep/ .carousel-control-prev{
      width:150px;
    }
    /deep/ .carousel-control-next-icon{
      /* background-color: black; */

      height: 80px;
      width: 35px;
    }
    /deep/ .carousel-control-prev-icon{
      /* background-color: black; */
      height: 80px;
      width: 35px;
    }`]
})

export class RouteReviewComponent implements OnInit {
  id: any;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  showNavigationArrows = true;
  pauseOnHover = true;
  showNavigationIndicators = false;
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  type: number = 1;

  constructor(private activateRoute: ActivatedRoute, private dataService: DataService){
    this.id = activateRoute.snapshot.params['id'];
  }
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  ngOnInit(){
    this.getPostByCategory();
  }
  routes:any = [];
  routeImages: any = [];
  userLikes: any = [];
  postLikes: any = [];
  data: any = [];
  user_id = localStorage.getItem('user_id');
  lastLike:number;
  userpostLikes:any = [];
  likes: any = [];
  userId:number = +this.user_id;

  getPostByCategory(){

    this.dataService.getPostByCategory(1,this.id).subscribe(res=>{
      this.routes = res;
      console.log(res)
      this.getUserLikes();
    })
  }
  getUserLikes(){
    this.dataService.userlikes(this.userId).subscribe(res=>{
      this.userLikes = res;
      for(let i=0;i<this.routes.length;i++){
        this.lastLike = 0;
        for(let j=0;j<this.userLikes.length;j++){
          console.log(this.routes[i].id, this.userLikes);
          if(this.routes[i].id === (+this.userLikes[j].post_id))this.lastLike++;
        }
        this.userpostLikes[i] = this.lastLike;
      }
    });


    this.dataService.getLikes().subscribe(res=>{
      this.likes = res;
      for(let i=0;i<this.routes.length;i++){
        this.lastLike = 0;
        for(let j=0;j<this.likes.length;j++){
          if(this.routes[i].id === (+this.likes[j].post_id))this.lastLike = +this.likes[j].count;
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


  route_type_1:string = "";
  somefunc1(e) {
    if(e.target.checked){
      this.route_type_1 = "піший";
      console.log("піший")
    } else {
      this.route_type_1 = "";
    }
  }
  route_type_2:string = "";
  somefunc2(e) {
    if(e.target.checked){
      this.route_type_2 = "вело";
    } else {
      this.route_type_2 = "";
    }
  }
  route_type_3:string = "";
  somefunc3(e) {
    if(e.target.checked){
      this.route_type_3 = "авто";
    } else {
      this.route_type_3= "";
    }
  }
  route_type_4:string = "";
  somefunc4(e) {
    if(e.target.checked){
      this.route_type_4 = "водний";
    } else {
      this.route_type_4 = "";
    }
  }
  sortByAsc(filter:string){
    this.dataService.getPostByCategoryAsc(this.type,this.id, filter).subscribe(res=>{
      this.routes = res;
      for(let i=0;i<this.routes.length;i++){
        this.dataService.getMediaUrl(this.routes[i].id).subscribe(res=>{
          this.routeImages[i] = res;
        });
        this.dataService.postlikes(this.routes[i].id).subscribe(res=>{
          this.data = res;
          this.postLikes[i] = this.data[this.data.length-1];
        });
      }
      console.log(this.postLikes);
    })
  }
  sortByDsc(filter:string){
    this.dataService.getPostByCategoryDsc(this.type,this.id, filter).subscribe(res=>{
      this.routes = res;
      for(let i=0;i<this.routes.length;i++){
        this.dataService.getMediaUrl(this.routes[i].id).subscribe(res=>{
          this.routeImages[i] = res;
        });
        this.dataService.postlikes(this.routes[i].id).subscribe(res=>{
          this.data = res;
          this.postLikes[i] = this.data[this.data.length-1];
        });
      }
      console.log(this.postLikes);
    })
  }
  clear(){
    this.dataService.getPostByCategory(this.type,this.id).subscribe(res=>{
      this.routes = res;
      for(let i=0;i<this.routes.length;i++){
        this.dataService.getMediaUrl(this.routes[i].id).subscribe(res=>{
          this.routeImages[i] = res;
        });
        this.dataService.postlikes(this.routes[i].id).subscribe(res=>{
          this.data = res;
          this.postLikes[i] = this.data[this.data.length-1];
        });
      }
      console.log(this.postLikes);
    })
    this.route_type_1 = "";
    this.route_type_2 = "";
    this.route_type_3 = "";
    this.route_type_4 = "";
  }
}
