import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { PlatilloComponent } from './platillo/platillo.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { AnunciosComponent } from './anuncios/anuncios.component';

export const routes: Routes = [

    {path:'',component:LoginComponent},
    {path:'bienvenida',component:BienvenidaComponent},
    {path: 'platillo', component: PlatilloComponent},
    {path: 'ingrediente', component: IngredienteComponent},  
    {path: 'Me', component: MiPerfilComponent}, 
    {path: 'consulta', component: ConsultaComponent}, 
    {path: 'anuncios', component: AnunciosComponent}, 
];
