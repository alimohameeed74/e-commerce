import { authGuard } from './core/guards/auth-guard.js';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then((p) => p.HomeComponent),
  },
  {
    path: 'shipping',
    loadComponent: () =>
      import('./features/pages/shipping/shipping.component').then((p) => p.ShippingComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/profile/profile.component').then((p) => p.ProfileComponent),
    children: [
      {
        path: 'addresses',
        loadComponent: () =>
          import('./features/pages/addresses/addresses.component').then(
            (p) => p.AddressesComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/pages/settings/settings.component').then((p) => p.SettingsComponent),
      },
    ],
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/orders/orders.component').then((p) => p.OrdersComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/pages/shop/shop.component').then((p) => p.ShopComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/pages/product-details/product-details.component').then(
        (p) => p.ProductDetailsComponent,
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/pages/categories/categories.component').then((p) => p.CategoriesComponent),
  },
  {
    path: 'categories/:id',
    loadComponent: () =>
      import('./features/pages/subcategory/subcategory.component').then(
        (p) => p.SubcategoryComponent,
      ),
  },
  {
    path: 'checkout/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/checkout/checkout.component').then((p) => p.CheckoutComponent),
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/pages/brands/brands.component').then((p) => p.BrandsComponent),
  },
  {
    path: 'products-filter',
    loadComponent: () =>
      import('./shared/components/shared-data-filter/shared-data-filter.component').then(
        (p) => p.SharedDataFilterComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/pages/contact/contact.component').then((p) => p.ContactComponent),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/pages/wishlist/wishlist.component').then((p) => p.WishlistComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/pages/cart/cart.component').then((p) => p.CartComponent),
  },
  {
    path: 'returns',
    loadComponent: () =>
      import('./features/pages/returns/returns.component').then((p) => p.ReturnsComponent),
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./features/pages/help/help.component').then((p) => p.HelpComponent),
  },
  {
    path: 'track-order',
    loadComponent: () =>
      import('./features/pages/track-order/track-order.component').then(
        (p) => p.TrackOrderComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/pages/login/login.component').then((p) => p.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/auth/pages/register/register.component').then((p) => p.RegisterComponent),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./core/auth/pages/forget-password/forget-password.component').then(
        (p) => p.ForgetPasswordComponent,
      ),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./core/pages/privacy/privacy.component').then((p) => p.PrivacyComponent),
  },
  {
    path: 'terms',
    loadComponent: () => import('./core/pages/terms/terms.component').then((p) => p.TermsComponent),
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./core/pages/cookies/cookies.component').then((p) => p.CookiesComponent),
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
  {
    path: '404',
    loadComponent: () =>
      import('./core/pages/not-found/not-found.component').then((p) => p.NotFoundComponent),
  },
];
