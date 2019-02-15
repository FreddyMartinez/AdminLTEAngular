import { NgModule } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

const routes: Routes = [
    {path: '', loadChildren: './main-frame/main-frame.module#MainFrameModule'},
    {path: 'account', loadChildren: './account/account.module#AccountModule'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule {}
