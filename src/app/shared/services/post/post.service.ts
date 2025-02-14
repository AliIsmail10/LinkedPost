import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../interfaces/post';
import { environment } from '../../../base/enviroment';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private _HttpClient: HttpClient) { }

  CreatePost(post: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}posts`,post);
  }

   
  GetAllPosts(page: number = 1): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}posts?page=${page}`);
  }
  
GetMyPosts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}users/664bcf3e33da217c4af21f00/posts?limit=10`);
  }


  GetsinglePost(id :string): Observable<any> {
  return this._HttpClient.get(`${environment.baseUrl}posts/${id}`)
  }
UpdatePost(id:string,data:object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}posts/${id}`,data);
  }

  DeletePost(id:string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}posts/${id}`);
  }

}
