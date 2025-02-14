import { ToastrService } from 'ngx-toastr';
import { photo } from './../../../shared/interfaces/user-data';
import { Router } from '@angular/router';
import { PostService } from './../../../shared/services/post/post.service';
import { CommentComponent } from './../../addation/comment/comment.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { Post } from '../../../shared/interfaces/post';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../shared/services/users/users.service';
import { UserData } from '../../../shared/interfaces/user-data';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommentComponent,DatePipe,FormsModule,NgIf,ReactiveFormsModule,NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  myPosts: Post[] = [];
  postId: string = '';
  editContent: string = ''; // Content for the post being edited
  savedFile: File | null = null; // File for the post image
  editingPostId: string | null = null; // Track which post is being edited
  isloading: boolean = false;
  savedImage!:File
  myData!:UserData
  clickOnImage:boolean=false
  changePassword: FormGroup;

  constructor(private _UsersService: UsersService, private _Router: Router, private toastr: ToastrService,private PostService:PostService) {
    this.changePassword = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      ]),
    });
  }

  ngOnInit(): void {
    this.fetchMyPosts();
    
    
    this.getMyDate();
  }

  fetchMyPosts(): void {
    this.isloading = true;
    this.PostService.GetMyPosts().subscribe({
      next: (res) => {
        this.myPosts = res.posts;
        this.isloading = false;
      },
      error: () => {},
    });
  }

  deletePost(id: string): void {
    this.PostService.DeletePost(id).subscribe({
      next: (res) => {
        
        this.fetchMyPosts();
      },
      error: () => {},
    });
  }

  // Show the form to edit a post
  showEditForm(id: string, content: string): void {
    this.editingPostId = id;
    this.editContent = content; // Set the current post content in the form
  }

  // Handle file input
  onFileSelected(event: any): void {
    this.savedFile = event.target.files[0]; // Get the selected file
  }

  // Call the update service
  updatePost(id: string): void {
    const formData = new FormData();
    if (this.editContent.trim()) {
      formData.append('body', this.editContent); // Update the post content
    }
    if (this.savedFile) {
      formData.append('image', this.savedFile); // Update the image if provided
    }

    this.PostService.UpdatePost(id, formData).subscribe({
      next: (res) => {
        
        this.fetchMyPosts(); // Refresh the post list after update
        this.editingPostId = null; // Hide the edit form after update
      },
      error: (err) => {
        console.error('Error updating post:', err);
      },
    });
  }

  getPost(id: string): void {
    this.PostService.GetsinglePost(id).subscribe({
      next: (res) => {
        
        this._Router.navigate([`/singlepost/${id}`]);
      },
      error: (err) => {
        
      },
    });
  }

  getMyDate(){
    this._UsersService.GetLoggedUserData().subscribe({
      next:(res)=>{
        
        this.myData=res.user
      },
      error:(err)=>{
        
      }
    })
  }

  showUploadModal(){
    this.clickOnImage=true
  }

  changeMyImage(e:Event){
    const file = e.target as HTMLInputElement;

    if (file.files && file.files[0]) {
      this.savedImage = file.files[0];
    }
     
}
updateImage(){

    const formData=new FormData()
    if(this.savedImage){
      formData.append('photo',this.savedImage)
    }
   this.clickOnImage=false
    this._UsersService.UploadProfilePhoto(formData).subscribe({
      next:(res)=>{
        
        this.getMyDate();
this.clickOnImage=false
 this.toastr.success('Image updated successfully');
      },
      error:(err)=>{
        
        this.toastr.error(err.error.message)
      }
    })

}


updatePassword(){
        

const myPass={
  password:this.changePassword.value.oldPassword,
  newPassword:this.changePassword.value.newPassword
}

this._UsersService.changePassword(myPass).subscribe({
  next: (res) => {
    

     this._UsersService.logout();
    this._Router.navigate(['/login']);
    // Show success message
    this.toastr.success('Password updated successfully');
  },
  error: (err) => {
    
    // Show error message
    this.toastr.error('Failed to update password');
  }
});

}



isModalOpen = false;

openModal() {
  this.isModalOpen = true;
}
closeModal(){
  this.isModalOpen=false;
}


}

