import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    role: string = '';
    isAdmin: boolean = false;
    selectedProduct: Product | null = null;
    
    filterName: string = '';
    filterPrice: number | null = null;
    filterQuantity: number | null = null;

    constructor(
        private productService: ProductService,
        private authService: AuthService,
        private router: Router,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.role = localStorage.getItem('role') || '';
        this.isAdmin = this.role === 'Admin';
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.getProducts().subscribe((data: Product[]) => {
            this.products = data;
        });
    }

    filteredProducts(): Product[] {
        return this.products.filter(product => {
            const matchesName = product.name.toLowerCase().includes(this.filterName.toLowerCase());
            const matchesPrice = this.filterPrice ? product.price <= this.filterPrice : true;
            const matchesQuantity = this.filterQuantity ? product.quantity >= this.filterQuantity : true;
            return matchesName && matchesPrice && matchesQuantity;
        });
    }

    editProduct(product: Product): void {
        if (this.selectedProduct === product) {
            this.selectedProduct = null;
        } else {
            this.selectedProduct = product;
        }
    }

    updateProduct(id: number, updatedProduct: Product): void {
        this.productService.updateProduct(id, updatedProduct).subscribe(() => {
            this.loadProducts();
            this.selectedProduct = null;
        });
    }

    deleteProduct(id: number): void {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.products = this.products.filter(product => product.id !== id);
          },
          error: (err) => {
            console.error('Error occurred while deleting product', err);
          }
        });
      }

    cancelEdit(): void {
        this.selectedProduct = null;
    }
}
