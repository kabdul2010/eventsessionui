import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ConfigComponent } from './config/config.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PaginatorService } from '../services/paginator.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ActiveeventmgmtRoutingModule } from './activeeventmgmt-routing.module';



@NgModule({
  declarations: [ListComponent, ConfigComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    ActiveeventmgmtRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    PaginatorService
  ],
  providers: [HttpClientModule, MatIconRegistry],
  bootstrap: []
})
export class ActiveeventmgmtModule { }
