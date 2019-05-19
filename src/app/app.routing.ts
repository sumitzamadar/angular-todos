import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { SignInComponent } from './signin/index';
import { SignUpComponent } from './signup/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: '**', redirectTo: '' }
];

export const AppRouting = RouterModule.forRoot(appRoutes);