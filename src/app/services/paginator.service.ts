import { Injectable, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
@NgModule()
export class PaginatorService {
  pageIndex: number = 0;
  pageSize: number = 5;
  sortActive: string = '';
  sortDirection: SortDirection = 'asc';
  constructor() { }
}