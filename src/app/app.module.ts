import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { TravelRoutesComponent } from './route/travel-routes/travel-routes.component';
import { AttractionsComponent } from './attractionsFolder/attractions/attractions.component';
import { HotelsComponent } from './gastroAndHotels/gastroAndHotelsMain/hotels.component';
import { NewEventComponent } from './eventsFolder/eventsHome/new-event.component';
import { RouteReviewComponent } from './route/route-list/route-review.component';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { AttractionsObjectComponent } from './attractionsFolder/attractions-list/attractions-object.component';
import { RouteReviewPageComponent } from './route/route-object/route-review-page.component';
import { AttractionPageComponent } from './attractionsFolder/attraction-page/attraction-page.component';
import { HotelsListComponent } from './gastroAndHotels/hotels-list/hotels-list.component';
import { HotelPageComponent } from './gastroAndHotels/hotel-object/hotel-page.component';
import { EventPageComponent } from './eventsFolder/event-object/event-page.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { InViewportModule } from 'ng-in-viewport';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './account/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { GidsComponent } from './gids/gids.component';
import { LoginComponent } from './account/login/login.component';
import { AccountComponent } from './account/account/account.component';
import { AuthGuard } from './auth.guard';
import { ToursListComponent } from './tours/tours-list/tours-list.component';
import { ToursPageComponent } from './tours/tours-page/tours-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'travel-routes', component: TravelRoutesComponent },
  { path: 'attractions', component: AttractionsComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'events', component: NewEventComponent },
  { path: 'events/:id', component: EventPageComponent },
  { path: 'travel-routes/:id', component: RouteReviewComponent },
  { path: 'travel-routes/:id/:id', component:RouteReviewPageComponent },
  { path: 'attractions/:id', component: AttractionsObjectComponent },
  { path: 'attractions/:id/:id', component: AttractionPageComponent},
  { path: 'hotels/:id', component: HotelsListComponent },
  { path: 'hotels/:id/:id', component: HotelPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'gids', component: GidsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'tourslist', component: ToursListComponent},
  { path: 'tourslist/:id', component: ToursPageComponent},



];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    TravelRoutesComponent,

    AttractionsComponent,

    HotelsComponent,

    NewEventComponent,

    RouteReviewComponent,

    AttractionsObjectComponent,

    RouteReviewPageComponent,

    AttractionPageComponent,


    HotelsListComponent,


    HotelPageComponent,

    EventPageComponent,

    RegistrationComponent,

    GidsComponent,

    LoginComponent,

    AccountComponent,

    ToursListComponent,

    ToursPageComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbds-0Yca9LcT4I_AVnkg3u4LHo3lsSA0'
    }),
    AgmDirectionModule,
    InViewportModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DataService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
