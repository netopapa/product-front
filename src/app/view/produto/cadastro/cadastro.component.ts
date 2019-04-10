import { Component, OnInit, } from '@angular/core';
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
  private produtos: Product[] = [];
  private prodName: string;

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
    this.prodName = '';

    this.produto = new Product();
    this.getProducts();

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
          this.prodName = this.produto.name;
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
    this.produto.name = this.prodName;

    if (this.edit) {
      this.service.update(produto);
      this.feedback.openSuccessSnackBar('Produto editado!');
      this.router.navigate(['/']);
    } else {
      this.service.save(produto);
      this.feedback.openSuccessSnackBar('Produto cadastrado!');
      this.router.navigate(['/']);
    }
  }

  getProducts() {
    this.produtos = this.service.getAll();
    console.log(this.produtos);
  }

  checkName(): boolean {
    const product = this.produtos.find(prod => prod.name === this.prodName);
    if (product && product.id !== this.produto.id) {
      return false;
    }
    return true;
  }

}
