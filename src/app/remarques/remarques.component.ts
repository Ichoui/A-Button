import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NocifsService} from '../providers/nocifs.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Remarques} from '../providers/nocifs';
import {arrayify} from 'tslint/lib/utils';
import {DatesService} from '../providers/dates.service';

@Component({
  selector: 'app-a',
  templateUrl: './remarques.component.html',
  styleUrls: ['./remarques.component.scss']
})
export class RemarquesComponent implements OnInit {

  incrementer;
  remarques: Remarques;
  docRef = this.db.collection('remarques').doc('actualRemarques');
  daily;
  monthly;
  yearly;

  constructor(public db: AngularFirestore, public nocifsService: NocifsService, public datesService: DatesService) {
    // Observable qui consomme le nocif service approprié et l'endroit à la vue
    this.nocifsService.getRemarques().subscribe(i => {
      this.remarques = i;
      this.incrementer = this.remarques.number;
    });

  }

  ngOnInit() {
    this.datesService.daily('dataRemarques');
    this.datesService.monthly('dataRemarques');
    this.datesService.yearly('dataRemarques');
    const dateIllisible =this.datesService.getDate();
    const dateArray = this.datesService.arrayDate();
    const dateLisible = this.datesService.dateLisible();
    // console.log(dateArray);
    console.log(dateLisible)
  }

  clickRelou() {
    let addOne = this.incrementer + 1;

    // Ajouter dans les data tracks
    this.db.collection('dataRemarques').add({
      number: addOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });

    // Mettre à jour le dernier à jour cliqué
    this.docRef.set({
      number: addOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });
  }

  errorButton() {
    let removeOne = this.incrementer - 1;
    if (removeOne < 0) {
      removeOne = 0;
    }
    this.docRef.set({
      number: removeOne,
      date: this.datesService.getDate(),
      dateLisible: this.datesService.dateLisible(),
      day: this.datesService.dayDate(),
      month: this.datesService.monthDate(),
      year: this.datesService.yearDate()
    });
  }
}
