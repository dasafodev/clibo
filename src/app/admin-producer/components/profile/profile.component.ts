import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    // private storage: AngularFireStorage,
    private toastService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {
    this.buildForm();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  mySubscription: any;
  breakpoint: number;
  uid: string;
  name: string;
  email: string;
  photo: string;
  dataUser: FormGroup;

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
    this.name = JSON.parse(localStorage.getItem('user')).displayName;
    this.email = JSON.parse(localStorage.getItem('user')).email;
    this.photo = JSON.parse(localStorage.getItem('user')).photoURL;
    this.uid = JSON.parse(localStorage.getItem('user')).uid;
    this.dataUser.reset({ user_name: this.name, user_email: this.email });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  reLoad() {
    this.router.navigate([this.router.url])
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }

  private buildForm() {
    this.dataUser = this.formBuilder.group({
      user_name: ['', [Validators.required]],
      // role: ['', [Validators.required]] Sin role
    })
  }

  editUserInfo(event: Event) {
    event.preventDefault();
    this.auth.updateDatabaseUser(this.uid, this.dataUser.value.user_name)
      .then((res) => {
        this.toastService.success("Se ha guardado correctamente")
        this.reLoad();
      })
      .catch(err => {
        this.toastService.error("Error al guardar")
        console.error(err)
      })
  }


}
