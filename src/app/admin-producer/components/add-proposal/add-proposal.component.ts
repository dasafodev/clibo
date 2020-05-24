import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProposalService } from 'src/app/shared/services/proposal.service';
import { Proposal } from 'src/app/shared/models/proposal';

@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styleUrls: ['./add-proposal.component.css']
})
export class AddProposalComponent implements OnInit {

  form: FormGroup;
  selected: string;
  categories: string[] = [
    "Entretenimiento",
    "Entrenamiento",
    "Clases",
    "Cocina",
    "Lectura"
  ]

  constructor(
    private formBuilder: FormBuilder,
    private proposalService: ProposalService,
    private toastService: ToastrService
  ) { }

  auctionId:string;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  postProposal(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const proposal: Proposal = {
        uid: '',
        id_user: JSON.parse(localStorage.getItem('user')).uid,
        price: this.form.value.price,
        id_auction: this.auctionId,
        description: this.form.value.description,
      }
      this.proposalService.createProposal(proposal)
        .then(() => this.toastService.success("Se ha creado correctamente tu propuesta"))
        .catch(() => this.toastService.error("Tuvimos problemas al crear tu propuesta"));
    }
  }

}
