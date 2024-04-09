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
import { EventEntity } from '../../model/event-entity';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  events: EventEntity[] = [];
  displayedColumns: string[] = ['S.No','eventname', 'eventId','description','Actions','Proposal'];
  dataSource!: MatTableDataSource<EventEntity>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
    private router: Router,
    private paginatorService: PaginatorService,
  ) { }

  ngOnInit(): void {
    this.getSessions();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getSessions() {
    this.sessionService.getMySessionList().subscribe(data => {
      this.events = data;
      const reversedData = data.slice().reverse();
      this.dataSource = new MatTableDataSource(reversedData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }





  eventDetails(eventId: number) {
    console.log("in clientdetails ---gaff" + eventId);
    this.router.navigate(['myevent-details', eventId]);
  }
  eventProposalDetails(eventId: number) {
    console.log("in clientdetails ---gaff" + eventId);
    this.router.navigate(['event-location-details', eventId]);
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
     
      } else if (result === 'cancel') {
        console.log('User clicked cancel');
      }
    });
  }
}



