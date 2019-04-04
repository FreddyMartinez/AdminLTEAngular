import { NgModule } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

const routes: Routes = [
    {path: '', loadChildren: './componentes/main-frame/main-frame.module#MainFrameModule'},
    {path: 'login', loadChildren: './componentes/account/account.module#AccountModule'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule {}
