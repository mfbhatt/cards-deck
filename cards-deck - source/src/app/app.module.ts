import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DragDropDirectiveModule} from "angular4-drag-drop";


import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';


@NgModule({
  declarations: [
    AppComponent,    
    CardsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropDirectiveModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
