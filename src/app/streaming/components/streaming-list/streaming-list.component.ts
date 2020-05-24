import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streaming-list',
  templateUrl: './streaming-list.component.html',
  styleUrls: ['./streaming-list.component.css']
})
export class StreamingListComponent implements OnInit {


  constructor(
    private toast: ToastrService,
    private streamingService: StreamingService,
    private auth: AuthService,
    private router: Router,
  ) { }


  @Input()
  videos: any;

  ngOnInit(): void {
  }

  clickFavorite(id_streaming) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.toast.error("¡Inicia sesión para agregarlo a tus favoritos!")
    } else {
      this.streamingService.selectFavorite(user.uid, id_streaming);
      this.auth.updateFavoritesLocalStorage(JSON.parse(localStorage.getItem('user')).uid)

    }
  }
  redirect(id:string){
    this.router.navigate(['/streaming'], { queryParams: {id}});
  }

  isFavorite(id_streaming: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const list_favorites: string[] = user.favorite_streamings;
      const finded = list_favorites.indexOf(id_streaming);
      return (finded === -1) ? false : true;
    }
    return false;

  }




}