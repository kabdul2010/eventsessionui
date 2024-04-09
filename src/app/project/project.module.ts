
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PaginatorService } from '../services/paginator.service';
import { AppComponent } from '../app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    ProjectRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
   MatCardModule,
   PaginatorService
  ],
  providers: [HttpClientModule, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class ProjectModule { }
