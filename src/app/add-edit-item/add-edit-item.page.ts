import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListService } from '../list.service';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.page.html',
  styleUrls: ['./add-edit-item.page.scss'],
})

export class AddEditItemPage {
  item: any;
  tabIndex: number;
  itemIndex: number;
  colores: Array<string>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController,
              private ListService: ListService) { 
    this.colores = ["success", "danger", "warning", "primary", "secondary"];

    this.tabIndex = +this.route.snapshot.paramMap.get('tab');
    this.itemIndex = +this.route.snapshot.paramMap.get('item'); 
    if (this.itemIndex >= 0) {
      this.item = Object.assign({}, this.ListService.getItem(this.tabIndex, this.itemIndex));
      this.item.date = new Date(this.item.date).toISOString();
    }
    else {
      this.item = { date: new Date().toISOString(), task: '', icon: 'success', minuts:1, percentatge:0, notes :''};
      //this.item.minuts = 1;
      //this.item.percentatge = 0;
      //this.item.notes = '';
    } 
  }

  async error(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  save() {
    if (!this.item.task.length) {
      this.error('Cal entrar totes les dades');
    }
    else {
      if (this.itemIndex >= 0) {
        this.ListService.setItem(this.tabIndex, this.item, this.itemIndex);
      }
      else {
        this.ListService.setItem(this.tabIndex, this.item);      
      }
      this.router.navigate(['/home']);
    }
  }

    async delete() {
    const alert = await this.alertController.create({
      header: 'Eliminar capítol',
      message: 'Estas segur/a?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (this.itemIndex >= 0) {
              this.ListService.deleteItem(this.tabIndex, this.item);
              this.router.navigate(['/home']);
            }

          }
        },       
        {
          text: 'CANCEL',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }




}