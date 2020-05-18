import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { StreamingModule } from '../streaming/streaming.module';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  slidesPerView: 3,
  freeMode: true,
  scrollbar:{
    el: '.swiper-scrollbar',
    hide:true
  }
};

@NgModule({
  declarations: [HomeComponent,],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StreamingModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class HomeModule { }
