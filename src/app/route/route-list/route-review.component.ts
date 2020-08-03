import { Component, OnInit, ViewChild } from '@angular/core';
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
    }

  `]
})
export class RouteReviewComponent implements OnInit {
  id: any;
  paused = true;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  showNavigationArrows = true;
  pauseOnHover = true;
  showNavigationIndicators = true;
  type: number = 1;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(private activateRoute: ActivatedRoute, private dataService: DataService){
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(){
    this.getPostByCategory();
    this.getUserLikes();
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


  routes:any = [];
  routeImages: any = [];
  userLikes: any = [];
  postLikes: any = [];
  data: any = [];
  user_id = localStorage.getItem('user_id');


  getPostByCategory(){
    // console.log(12333);

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
  }
  userId:number = +this.user_id;
  getUserLikes(){
    console.log(this.userId);
    this.dataService.userlikes(this.userId).subscribe(res=>{
      this.userLikes = res;
    });
  }
  counter:number;
  numLikes:number = 0;

  userLikesPost(post_id:any, count:number){
    this.numLikes = 0;
    if(!this.user_id){
      alert('Ви не увійшли в аккаунт');
    } else {
      for(let i = 0; i < this.userLikes.length; i++){
        if(post_id === this.userLikes[i].post_id) this.numLikes++;
      }
      this.counter = +count;
      if(this.numLikes%2==0)this.counter++;
      else this.counter--;
      this.dataService.userlikespost(post_id, this.counter, this.user_id)
        .subscribe(
          response => {
            for(let i=0;i<this.routes.length;i++){
              this.dataService.postlikes(this.routes[i].id).subscribe(res=>{
                this.data = res;
                this.postLikes[i] = this.data[this.data.length-1];
              });
            }
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
