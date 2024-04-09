import { ProjectEntity } from '../../model/project-entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { PaginatorService } from '../../services/paginator.service';
import { ModalComponent } from '../../modal/modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: ProjectEntity[] = [];
  displayedColumns: string[] = ['SNO', 'projectName', 'clientName', 'projectCost', 'projectHead', 'rph', 'Actions'];
  dataSource!: MatTableDataSource<ProjectEntity>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router,
    private paginatorService: PaginatorService,
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getProjects() {
    this.projectService.getProjectsList().subscribe(data => {
      this.projects = data;
      const reversedData = data.slice().reverse();
      this.dataSource = new MatTableDataSource(reversedData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateProject(project: ProjectEntity) {
    this.router.navigate(['./project/update-project', { project: JSON.stringify(project) }]);
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe(data => {
      console.log(data);
      this.getProjects();
    });
  }

  projectDetails(projectId: number) {
    console.log("in projectdetails " + projectId);
    this.router.navigate(['project-details', projectId]);
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

  open(projectId: any) {
    const data = { message: 'Hello from the main component!' };

    const modalRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data,
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result === 'continue') {
        this.deleteProject(projectId);
      } else if (result === 'cancel') {
        console.log('User clicked cancel');
      }
    });
  }
}
