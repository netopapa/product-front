import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { FeedbackService } from '../../../service/feedback/feedback.service';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../service/product/product.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit, AfterViewInit {

  private displayedColumns = ['name', 'description', 'dtCreate', 'acoes'];
  private dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: ProductService,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>();
    this.dataSource.data = [];
    this.paginator.pageSize = 10;
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.getProdutos();


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProdutos(): void {
    this.service.getAll().subscribe(
      success => {
        this.dataSource.data = success;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteThis(id: number): void {
    this.service.delete(id.toString()).subscribe(
      success => {
        this.feedback.openSnackBar(success.msg);
        this.getProdutos();
      },
      error => {
        this.feedback.openSnackBar(error);
      }
    );
  }

  editThis(id: string): void {
      this.router.navigate([`/form/${id}`]);
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
