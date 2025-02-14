import { Component, HostListener, OnInit } from '@angular/core';
import { CommentComponent } from "../../addation/comment/comment.component";
import { PostService } from '../../../shared/services/post/post.service';
import { Post } from '../../../shared/interfaces/post';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent,DatePipe,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  allPosts:Post[]=[];
  savedFile!:File
  content:string=""
  currentPage = 1;
items: any[] = [];
isLoading = false;
  constructor(private PostService:PostService,private _Router:Router){}
  ngOnInit(): void {
     this.fetchPosts()
  }


  fetchPosts(): void {
    this.isLoading = true;
    this.PostService.GetAllPosts(this.currentPage).subscribe({
      next: (res) => {
        this.allPosts = res.posts;
        // this.allPosts=this.allPosts
        console.log('All posts:', this.allPosts);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
        this.isLoading = false;

      }
    });
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const totalHeight = document.body.scrollHeight;
  
    // Scroll down logic (infinite scrolling)
    if (scrollPosition >= totalHeight) {
      this.currentPage++;
      this.fetchPosts();
    }
  
    if (window.scrollY === 0) {
      --this.currentPage;
      this.fetchPosts();

      console.log('this.currentPage',this.currentPage );
      if(this.currentPage<1){
        this.currentPage=1;
        this.fetchPosts();
      }
      console.log('Reached the top of the page');
    }
    
  }
  
  changeImage(e:Event):void{

  const input =e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
   this.savedFile=input.files[0]
  }
}
AddPost(): void {
  const formData = new FormData();
  if (this.savedFile) {
    formData.append('image', this.savedFile);
  }

  if (this.content && this.content.trim()) {
    formData.append('body', this.content);
  }

  this.PostService.CreatePost(formData).subscribe({
    next: (res) => {
      console.log('Post added:', res);
        this.fetchPosts()

      this.content = '';


        console.log('All posts after add:=========', 
        this.fetchPosts()

        );
      this.closeModal();
    },
    error: (err) => {
      console.error('Error adding post:', err);
    }
  });
}

isModalOpen = false;

openModal() {
  this.isModalOpen = true;
}


closeModal() {
  this.isModalOpen = false;
  const modal = document.getElementById('authentication-modal');
  const backdrops = document.getElementsByClassName('bg-gray-900/50'); // No need to escape '/'

  if (modal) {
    modal.classList.add('hidden'); // Hide the modal
  }

  if (backdrops.length > 0) {
    for (let i = 0; i < backdrops.length; i++) {
      backdrops[i].classList.add('hidden'); // Hide each backdrop
    }

    document.body.classList.remove('overflow-hidden');
  }
}

getPost(id : string): void {
    
  this.PostService.GetsinglePost(id).subscribe({
   next:(res)=>{
   console.log(res);
    this._Router.navigate([`/singlepost/${id}`])
   
   },
   error:(err)=>{
     console.log(err);
     
   }
  })

 }


 
}