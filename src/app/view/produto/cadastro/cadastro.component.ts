import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../model/product.model';
import { FeedbackService } from '../../../service/feedback/feedback.service';
import { ProductService } from '../../../service/product/product.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  private produto: Product;

  private edit: boolean;
  private txtBtnSubmit = '';
  private txtHeader = '';

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.produto = new Product();

    this.welcome();
  }

  welcome() {
    this.route.params.subscribe(
      (params: any) => {
        if (params['id'] != null) {
          this.edit = true;
          this.txtBtnSubmit = 'editar';
          this.txtHeader = 'Edição';
          this.getProduct(params['id']);
        } else {
          this.edit = false;
          this.txtBtnSubmit = 'cadastrar';
          this.txtHeader = 'Cadastro';
        }
      }
    );
  }

  getProduct(id: number): void {
    console.log(id);
    console.log(this.service.getOne(id));
    Object.assign(this.produto, this.service.getOne(id));
  }

  save(produto: Product): void {

    if (this.edit) {
      this.service.update(produto);
      this.feedback.openSnackBar('Produto editado!');
      this.router.navigate(['/']);
    } else {
      this.service.save(produto);
      this.feedback.openSnackBar('Produto cadastrado!');
      this.router.navigate(['/']);
    }

  }

}
