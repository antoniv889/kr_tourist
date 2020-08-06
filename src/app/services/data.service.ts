import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private httpCLient:HttpClient,
  ) { }
  // getData(category_id){
  //   return this.httpCLient.get('http://kr.travel/getroutes/'+category_id);
  // }
  // getDataById(id){
  //   return this.httpCLient.get('http://kr.travel/getroute/'+id);
  // }
  getCategories(post_type_id){
    return this.httpCLient.get('http://kr.travel/api/categories/'+post_type_id);
  }
  getPostByCategory(type,category_id){
    return this.httpCLient.get('http://kr.travel/api/getposts/'+type+'/'+category_id);
  }


  getPostByCategoryAsc(type,category_id,filter){
    return this.httpCLient.get('http://kr.travel/api/getposts_asc/'+type+'/'+category_id+'/'+filter);
  }
  getPostByCategoryDsc(type,category_id,filter){
    return this.httpCLient.get('http://kr.travel/api/getposts_dsc/'+type+'/'+category_id+'/'+filter);
  }


  getPostList(type_id){
    return this.httpCLient.get('http://kr.travel/api/getpostlist/'+type_id);
  }
  getPostById(id){
    return this.httpCLient.get('http://kr.travel/api/getpostbyid/'+id);
  }
  getMediaUrl(id){
    return this.httpCLient.get('http://kr.travel/api/getmediaurl/'+id);
  }
  getPointsById(id){
    return this.httpCLient.get('http://kr.travel/api/getpoints/'+id);
  }
  getComment(post_id){
    return this.httpCLient.get('http://kr.travel/api/comment/'+post_id);
  }
  getRouteObjects(id){
    return this.httpCLient.get('http://kr.travel/api/get_objects_by_route_id/'+id);
  }
  userlikes(user_id){
    return this.httpCLient.get('http://kr.travel/api/getuserlikes/'+user_id);
  }
  postlikes(post_id){
    return this.httpCLient.get('http://kr.travel/api/getpostlikes/'+post_id);
  }
  getLikes(){
    return this.httpCLient.get('http://kr.travel/api/getlikes');

  }
  deleteuserlikes(id){
    return this.httpCLient.get('http://kr.travel/api/destroyserlike/'+id);
  }
  getCommentAuthor(id){
    return this.httpCLient.get('http://kr.travel/api/getusername/'+id);
  }
  addComment(author_id: string, post_id: string, content: string){
    return this.httpCLient.post('http://kr.travel/api/addcomment',
      {author_id:author_id, post_id:post_id, content:content},
      {headers:new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})}
    );
  }
  userlikespost(post_id: number, count: number, user_id: string){
    return this.httpCLient.post('http://kr.travel/api/userlikepost',
      {post_id:post_id, count:count, user_id:user_id},
      {headers:new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})
    });
  }
  getGids(){
    return this.httpCLient.get('http://kr.travel/api/getgids');
  }
  getGid(id){
    return this.httpCLient.get('http://kr.travel/api/getgid/'+id);
  }
  getPostGids(id){
    return this.httpCLient.get('http://kr.travel/api/postgids/'+id);
  }
}
