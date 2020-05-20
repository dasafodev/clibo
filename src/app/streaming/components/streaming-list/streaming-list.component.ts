import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-streaming-list',
  templateUrl: './streaming-list.component.html',
  styleUrls: ['./streaming-list.component.css']
})
export class StreamingListComponent implements OnInit {

  
  constructor(
    private toast:ToastrService
  ) { }

  
  @Input()
  videos:any;

  ngOnInit(): void {
    
  }

  clickFavorite(){
    const user = JSON.parse(localStorage.getItem('usuario'));
    if(!user){
      this.toast.error("¡Inicia sesión para agregarlo a tus favoritos!")
    }else{
      
    }
    

  }

}