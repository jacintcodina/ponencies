import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AlertController, IonList } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';
import { CountdownComponent } from 'ngx-countdown';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { IonContent } from '@ionic/angular';



@Component({
  selector: 'app-tempo',
  templateUrl: './tempo.page.html',
  styleUrls: ['./tempo.page.scss']
})

export class TempoPage implements OnInit, OnDestroy {
  @ViewChild('countdown', { static: false }) private countdown: CountdownComponent;
  @ViewChild(IonContent, {static: true}) content: IonContent;
    

  tabs: any;
  tabIndex: number;
  reorder: boolean;
  minutsTotal: number;
  amagarComencar: boolean;
  amagarCrono: boolean;
  amagarFinalitzat : boolean;
  
  config:any;
  showStop:boolean;

  timeLeft: number = 0;
  interval;
  posicio = 0; 
  scrollTo = null;

 

  barTimer1() {
   
    let tempsAcumulat = 0;
           
    var lista=  JSON.parse(localStorage.getItem('todo-list-'+0));
    //timer callback
    var llistatasques = this.tabs;
    if (lista != null) {
    

      this.interval = setInterval(() => {
        if(this.timeLeft < this.minutsTotal*60) {
          this.timeLeft++;
            llistatasques[0].list.forEach ((llista, index)  => {
                  let minuts=llista.minuts;
                  let intervals = .016666666666/minuts ;  //0.01

                  if (this.posicio==index) {

                      llistatasques[0].list[this.posicio].percentatge += intervals;
                      if (((llista.minuts*60)+tempsAcumulat)==this.timeLeft) {                           
                          tempsAcumulat += (llista.minuts*60);
                          this.posicio+=1;
                          if (this.posicio > 2) {this.content.scrollToPoint(0, (80*(this.posicio-2)), 800);}

                          
                          
                      };
                  };
                 

          })
          
        } else {
          this.timeLeft = 0;
          this.amagarFinalitzat = false;  
          this.amagarCrono = true;  
          console.log("finalitzat");     
        }
      },1000);
      
      
    }      
  }


 

  constructor(
          private router: Router,
          private route: ActivatedRoute,
          private listService: ListService,
          private alertController: AlertController,
          private insomnia: Insomnia
          ){    
            
          }
     

  
  ngOnInit() {
          this.ionViewWillEnter();  
          
         
    }  

    ngOnDestroy() {
      this.ionViewWillEnter();
      this.parar();
    }


    ionViewWillEnter() {
      this.tabs = [
        {label: 'Inici', icon: 'home', list: []},
        {label: 'Tempo', icon: 'time', list: []}
      ];

      this.tabs.forEach((tab, index) => {
           tab.list = this.listService.getList(index);  
      });
      this.minutsTotal = this.calculMinuts();
      this.amagarComencar = false;
      this.amagarFinalitzat = true;      
      this.amagarCrono = true;
      this.tabIndex = 0;
      this.reorder = false;
      this.posicio = 0; 
      
      
      
    }

  

    

    parar() {
      this.config = {leftTime:this.minutsTotal*60, demand:true};
      this.amagarComencar = false;
      this.amagarCrono = true;
      this.amagarFinalitzat = true;
      clearInterval(this.interval);
      
      this.insomnia.allowSleepAgain() // deixar parar pantalla
        .then(
          () => console.log(JSON.stringify('insomnia success')),
          () => console.log(JSON.stringify('insomnia error'))
        );
  
    }

    comencar() {
         this.config = {leftTime:this.minutsTotal*60, demand:false};
         this.barTimer1();
         this.amagarComencar = true;
         this.amagarCrono = false;
         this.amagarFinalitzat = true;

         var llistatasques = this.tabs;
         if (llistatasques != null) {
            llistatasques[0].list.forEach ((llista, index)  => {
                  llistatasques[0].list[index].percentatge = 0;
              });
                         
          }
          
          this.insomnia.keepAwake()  // no deixar parar pantalla
            .then(
                () => console.log(JSON.stringify('insomnia success')),
                () => console.log(JSON.stringify('insomnia error'))
          );    
              
    }

    calculMinuts() {
      let suma = 0;
      let lista=  JSON.parse(localStorage.getItem('todo-list-'+0));
      if (lista != null) {
            lista.forEach(llista  => {
              if(llista.minuts>0) {
                suma = suma + llista.minuts;
              }
          });
        };
     return suma;
    }

    
    handleEvent(event){
      console.log(event)
  }

  
        
   /* barTimer() {
      let time = 0;
      let posicio = 0; 
      let tempsAcumulat = 0;
              
      let segons = this.minutsTotal*60*1000;
      var lista=  JSON.parse(localStorage.getItem('todo-list-'+0));
      //timer callback
      var llistatasques = this.tabs;
      if (lista != null) {
        
     
       var timer = function() {
        //this.minutsConsumits = (time);
        if( time < segons) {  //fer fins al final de tots els
            time += 1000;

            llistatasques[0].list.forEach ((llista, index)  => {

                  let minuts=llista.minuts;
                  let intervals = .016666666666/minuts ;  //0.01
                  
                  if (posicio==index) {
                    llistatasques[0].list[posicio].percentatge += intervals;
                                      
                      if (((llistatasques[0].list[posicio].minuts*60*1000)+tempsAcumulat)==time) { 
                        posicio+=1;
                        tempsAcumulat += (time);
                      };
                  };

             })
 
             setTimeout(timer, 1000);
         }
       }
      //run!!
       setTimeout(timer, 1000); 
      }

    }
*/
   

  

}

