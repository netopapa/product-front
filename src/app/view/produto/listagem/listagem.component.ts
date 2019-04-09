import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from '../../../model/product.model';
import { FeedbackService } from '../../../service/feedback/feedback.service';
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
    this.dataSource.data = this.service.getAll();
  }

  deleteThis(id: number): void {
    this.service.delete(id);
    this.feedback.openSnackBar('Produto deletado!');
    this.getProdutos();
  }

  editThis(id: number): void {
    this.router.navigate([`/form/${id}`]);
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
