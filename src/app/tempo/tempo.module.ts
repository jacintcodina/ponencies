import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TempoPageRoutingModule } from './tempo-routing.module';

import { TempoPage } from './tempo.page';

import { CountdownModule } from 'ngx-countdown';

import { Insomnia } from '@ionic-native/insomnia/ngx';



@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule,
    TempoPageRoutingModule,
    CountdownModule
  ],
  providers: [
    Insomnia

  ],
  declarations: [TempoPage]
})
export class TempoPageModule {}
