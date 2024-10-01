import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { PlatilloComponent } from './platillo/platillo.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';


export const routes: Routes = [

    {path:'',component:LoginComponent},
    {path:'bienvenida',component:BienvenidaComponent},
    {path: 'platillo', component: PlatilloComponent},
    {path: 'ingrediente', component: IngredienteComponent},    
];
