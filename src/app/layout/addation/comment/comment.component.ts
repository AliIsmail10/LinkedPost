import { UsersService } from './../../../shared/services/users/users.service';
import { UserData } from './../../../shared/interfaces/user-data';
import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../shared/services/commnents/comments.service';
import { Commnet } from '../../../shared/interfaces/commnet';
import { DatePipe, NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule,FormsModule,NgClass],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(
    private commentsService: CommentsService,
    private toastrService: ToastrService,
    private UserData:UsersService
  ) {}

  @Input() postId!: string;
  allComments: Commnet[] = [];
  commentForm!: FormGroup;
  editingCommentId: string | null = null;  
  editContent: string = '';
  showFrom:boolean=false; 
  dropdownOpenId: string | null = null;
  currentUserId: string = ''; 
  isLoading: boolean = false;

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(null, [Validators.required]),
      post: new FormControl(this.postId),
    });


    // Get the logged-in user's ID and assign it to `currentUserId`
    this.UserData.GetLoggedUserData().subscribe((res) => {
      this.currentUserId = res.user._id;
    });
    this.loadComments();
  }

  loadComments() {
    this.isLoading = true;
    if (this.postId) {
      this.commentsService.GetPostComments(this.postId).subscribe({
        next: (res) => {
          this.allComments = res.comments.reverse();
          this.isLoading = false;
        },
        error: (err) => {
          this.toastrService.error(err.error.message);
        }
      });
    }
  }

  createComment() {
    if (!this.commentForm.valid) {
      return;
    }
    this.isLoading = true;
    this.commentsService.CreateComment(this.commentForm.value).subscribe({
      next: (res) => {
        this.allComments = res.comments.reverse();
        this.commentForm.reset();
        this.toastrService.success('Comment added successfully');
        this.isLoading = false;
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      }
    });
  }

  ShowEditComment(id: string, content: string) {
    this.editContent = content;
    this.editingCommentId = id;
    this.showFrom = true;
  }

  

  
  updateComment(id: string) {
    this.showFrom = false;
    const updateData = { content: this.editContent };
    this.commentsService.UpdateComment(id, updateData).subscribe({
      next: (res) => {
        const commentIndex = this.allComments.findIndex(comment => comment._id === id);
        if (commentIndex !== -1) {
          this.allComments[commentIndex] = res.comment;
        }
        this.editContent = '';
        this.editingCommentId = null;
        this.toastrService.success('Comment updated successfully');
        this.isLoading=false;
      },
      error: (err) => {
        this.toastrService.error("you are not allowed to perform this action.");
      }
    });
  }



  
  
  DeleteCommentInPost(id: string) {
    
    this.commentsService.DeleteComment(id).subscribe({
      next: (res) => {
        const commentIndex = this.allComments.findIndex(comment => comment._id === id);
         if(commentIndex !== 1) {
        this.allComments.splice(commentIndex,1)
      }         
        this.toastrService.success('Comment Deleted successfully');
        this.isLoading=false;
      },
      error: (err) => {
        this.toastrService.error("you are not allowed to perform this action.");
      }
    });
  }

  // DeleteComment(id: string) {
  //   this.commentsService.DeleteComment(id).subscribe({
      
  //     next: (res) => {
  //       this.allComments = this.allComments.filter(comment => comment._id !== id);
        
  //       console.log('deleted comment', res.comments);
  //       this.toastrService.success('Comment deleted successfully');
  //     },
  //     error: (err) => {
  //       this.toastrService.error(err.error.message);
  //     }
  //   });
  // }
  
  


}