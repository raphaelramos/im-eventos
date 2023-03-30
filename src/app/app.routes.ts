import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { PasswordComponent } from './auth/login/password/password.component';
import { ResetComponent } from './auth/login/password/reset/reset.component';
import { AuthGuard } from './guards/auth.guard';

import { SobreComponent } from './sobre/sobre.component';

import { LoginLayoutComponent } from './_layouts/login/login-layout.component';
import { PublicLayoutComponent } from './_layouts/public/public-layout.component';
import { PainelLayoutComponent } from './_layouts/painel/painel-layout.component';

export const ROUTES: Routes = [
    // Public
    {
        path: '',
        component: PublicLayoutComponent,
        title: 'Inscrição',
        children: [
            { path: '', redirectTo: 'subscribe', pathMatch: 'full' },
            {
                path: 'subscribe', 
                loadChildren: () => import('./subscribe/subscribe.module').then(m => m.SubscribeModule),
            },
            { path: 'sobre', component: SobreComponent },
        ]
    },

    // Login
    {
        path: 'login',
        component: LoginLayoutComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: ':redirect', component: LoginComponent },
        ]
    },
    {
        path: 'password',
        component: LoginLayoutComponent,
        children: [
            { path: '', component: PasswordComponent },
            { path: 'reset/:token', component: ResetComponent },
        ]
    },

    // Dashboard
    {
        path: 'painel',
        component: PainelLayoutComponent,
        canActivate: [AuthGuard],
        title: 'Painel Administração',
        children: [
            { path: '', loadChildren: () => import('./painel/home/home.module').then(m => m.HomeModule) },
            { path: 'eventos', loadChildren: () => import('./painel/eventos/eventos.module').then(m => m.EventosModule) },
            { path: 'administracao', loadChildren: () => import('./painel/administracao/administracao.module').then(m => m.AdministracaoModule) },
        ]
    },

    // User profile
    {
        path: 'perfil',
        component: PublicLayoutComponent,
        canActivate: [AuthGuard],
        title: 'Perfil',
        children: [
            { path: '', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
        ]
    },
];
