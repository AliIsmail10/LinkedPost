import { Post } from './../../../shared/interfaces/post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../shared/services/post/post.service';
import { CommentComponent } from '../../addation/comment/comment.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-singlepost',
  standalone: true,
  imports: [CommentComponent,DatePipe],
  templateUrl: './singlepost.component.html',
  styleUrl: './singlepost.component.css'
})
export class SinglepostComponent implements OnInit{

  post: any = {};
  postId:string=''
  constructor(private _PostService:PostService,private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
      this._ActivatedRoute.params.subscribe(params => {
        let id = params['id'];
        this._PostService.GetsinglePost(id).subscribe(post => {
          this.post = post.post;
        });
      });
  }




}
