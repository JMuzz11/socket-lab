import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';

const routes: Routes = [
  { path: '', component: ChatInterfaceComponent },  // Set the default route to the chat component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
