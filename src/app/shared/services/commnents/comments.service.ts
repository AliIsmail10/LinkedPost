import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../base/enviroment';
import { Commnet } from '../../interfaces/commnet';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  
  constructor(private _HttpClient: HttpClient) { }
  CreateComment(comment: Commnet): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}comments`,comment);
  }
  GetPostComments(id:string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}posts/${id}/comments`);
  }

UpdateComment(id:string,data:object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}comments/${id}`,data);
  }

  DeleteComment(id:string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}comments/${id}`);
  }

}
