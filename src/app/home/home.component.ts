import { Component, ViewChild , Input, OnInit} from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';


@Component({
  selector: 'ngbd-modal-content',
  template: `

    <div class="modal-header" width="100px">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" style="height: 300px;">
      <input type="text" placeholder="text" style="border-color: #c9c9c9; border-radius: 5px; width: 70%;">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')" style="height:30px; margin-bottom: 4px; margin-left:6%;">
        <p style="transform: translate(0,-25%)">Search</p>
      </button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
  title = 'kriviyRih';
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  showNavigationArrows = true;
  pauseOnHover = true;
  showNavigationIndicators = false;
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
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
  constructor(private modalService: NgbModal, private dataService: DataService) {}
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
  }

  categories:any = [];
  routes:any = [];
  routeImages: any = [];

  ngOnInit(){
    this.getCategories();
    this.getPosts();
    this.getEvents();
    this.getGids();
  }
  getCategories(){
    this.dataService.getCategories(1).subscribe(res=>{
      this.categories = res;
    })
  }
  routesLength:number;
  getPosts(){
    this.dataService.getPostList(1).subscribe(res=>{
      this.routes = res;
      this.routesLength = this.routes.length;
    });
  }
  gids:any = [];
  getGids(){
    this.dataService.getGids().subscribe(res=>{
      this.gids = res;
    })
  }
  events:any = [];
  getEvents(){
    this.dataService.getPostList(5).subscribe(res=>{
      this.events = res;
    })
  }

}
