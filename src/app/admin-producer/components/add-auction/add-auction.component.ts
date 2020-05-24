import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { Auction } from 'src/app/shared/models/auction';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css']
})
export class AddAuctionComponent implements OnInit {

  form: FormGroup;
  selected:string;
  categories:string[] = [
    "Entretenimiento",
    "Entrenamiento",
    "Clases",
    "Cocina",
    "Lectura"
  ]

  constructor(
    private formBuilder: FormBuilder,
    private auctionService: AuctionService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  postAuction(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const auction: Auction = {
        uid: '',
        id_user: JSON.parse(localStorage.getItem('user')).uid,
        category: this.selected,
        price: this.form.value.price,
        description: this.form.value.description,
        winner: ''
      }
      this.auctionService.createAuction(auction)
        .then(() => this.toastService.success("Se ha creado correctamente tu subasta"))
        .catch(() => this.toastService.error("Tuvimos problemas al crear tu subasta"));
    }
  }

}
