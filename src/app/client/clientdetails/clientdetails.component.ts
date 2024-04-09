import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ClientEntity } from '../../model/client-entity';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-clientdetails',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './clientdetails.component.html',
  styleUrl: './clientdetails.component.css'
})
export class ClientdetailsComponent implements OnInit {
  clientId!: number
  clientEntity!: ClientEntity
  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['id'];
    console.log(this.clientId)
    this.clientEntity = new ClientEntity();
    this.clientService.getClientById(this.clientId).subscribe(data => {
     this.clientEntity = data;
    });
  }

  goBack() {
    this.router.navigate(['client/client-list']);
  }

}
