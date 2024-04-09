import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ClientEntity } from '../../model/client-entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatorService } from '../../services/paginator.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  clients: ClientEntity[] = [];
  displayedColumns: string[] = ['SNO', 'clientName', 'currency', 'emailId', 'mobile', 'country', 'Actions'];
  dataSource!: MatTableDataSource<ClientEntity>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService,
    private router: Router,
    private paginatorService: PaginatorService,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getClients() {
    this.clientService.getClientsList().subscribe(data => {
      this.clients = data;
      const reversedData = data.slice().reverse();
      this.dataSource = new MatTableDataSource(reversedData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateClient(client: ClientEntity) {
    this.router.navigate(['./client/update-client', { client: JSON.stringify(client) }]);
  }

  deleteClient(clientId: number) {
    this.clientService.deleteClient(clientId).subscribe(data => {
      console.log(data);
      this.getClients();
    });
  }

  clientDetails(clientId: number) {
    console.log("in clientdetails " + clientId);
    this.router.navigate(['client-details', clientId]);
  }
  ngAfterViewInit() {
    this.paginator.pageIndex = this.paginatorService.pageIndex;
    this.paginator.pageSize = this.paginatorService.pageSize;

    this.sort.active = this.paginatorService.sortActive;
    this.sort.direction = this.paginatorService.sortDirection;

    this.paginator.page.subscribe(() => {
      this.paginatorService.pageIndex = this.paginator.pageIndex;
      this.paginatorService.pageSize = this.paginator.pageSize;
    });

    this.sort.sortChange.subscribe(() => {
      this.paginatorService.sortActive = this.sort.active;
      this.paginatorService.sortDirection = this.sort.direction;
    });
  }
  open(clientId: any) {
    const data = { message: 'Hello from the main component!' };

    const modalRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data,
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result === 'continue') {
        this.deleteClient(clientId)
      } else if (result === 'cancel') {
        console.log('User clicked cancel');
      }
    });
  }
}



