import { Component, OnInit, signal, WritableSignal, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders/orders.service.js';
import { IonlineOrderResponse } from '../../models/api-response-order/online-order-response/Ionline-order-response.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [RouterLink, ReactiveFormsModule],
})
export class CheckoutComponent implements OnInit {
  cartId: WritableSignal<string> = signal('');
  shippingAddressForm: FormGroup;
  ifOnline: WritableSignal<boolean> = signal(true);
  ifCash: WritableSignal<boolean> = signal(true);
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrdersService,
    private toaster: ToastrService,
  ) {
    this.shippingAddressForm = this.fb.group({
      details: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  ngOnInit() {
    this.clearForm();
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) this.cartId.set(id);
      else this.router.navigate(['/404']);
    });
  }
  payment(number: number) {
    if (this.shippingAddressForm.valid) {
      this.isLoading.set(true);
      if (number === 1) {
        // cash
        this.ifCash.set(false);
        this.ifOnline.set(true);
        this.orderService.createCashOrder(this.cartId(), this.shippingAddressForm.value).subscribe({
          next: (res: any) => {
            this.isLoading.set(false);
            this.toaster.success(res?.message, res?.status);
            this.router.navigate(['/allorders']);
          },
          error: (err: any) => {
            this.isLoading.set(false);
            this.toaster.error(err?.error?.message, err?.error?.statusMsg);
            this.router.navigate(['/products']);
            console.log(err);
          },
        });
      }
      if (number === 2) {
        // online
        this.ifCash.set(true);
        this.ifOnline.set(false);
        this.orderService.checkoutSession(this.cartId(), this.shippingAddressForm.value).subscribe({
          next: (res: IonlineOrderResponse) => {
            this.isLoading.set(false);
            window.location.href = res.session.url;
          },
          error: (err: any) => {
            this.isLoading.set(false);
            console.log(err);
          },
        });
      }
    }
  }

  get detailsController() {
    return this.shippingAddressForm.get('details');
  }
  get phoneController() {
    return this.shippingAddressForm.get('phone');
  }
  get cityController() {
    return this.shippingAddressForm.get('city');
  }
  get postalCodeController() {
    return this.shippingAddressForm.get('postalCode');
  }

  clearForm() {
    this.shippingAddressForm.reset({
      details: '',
      phone: '',
      city: '',
      postalCode: '',
    });
  }
}
