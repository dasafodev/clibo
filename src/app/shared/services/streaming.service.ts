import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Streaming } from '../models/streaming';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(
    public afs: AngularFirestore,

  ) { }

  getStreamings(id_producer:string){
    return this.afs.collection('streamings', query => query.where('id_producer','==',id_producer)).valueChanges();
  }

  fillDatabase(){
    let data1 = [
      {
          "id": 1,
          "name": "Jerry Maguire",
          "url": "https://npr.org/eu/felis/fusce/posuere/felis/sed/lacus.aspx",
          "photoURL": "http://dummyimage.com/194x181.png/5fa2dd/ffffff",
          "description_short": "Spontaneous rupture of extensor tendons, lower leg",
          "description_long": "Neuroendocrine cell hyperplasia of infancy",
          "date_start": "11/1/2020",
          "category": "Drama|Romance",
          "id_producer": "044QpjQbJchpO1579Ta5Nj89uW62"
      },
      {
          "id": 2,
          "name": "Profit, The",
          "url": "https://latimes.com/praesent/id/massa.jpg",
          "photoURL": "http://dummyimage.com/124x128.png/ff4444/ffffff",
          "description_short": "Cervicalgia",
          "description_long": "Ureteral fistula",
          "date_start": "27/7/2019",
          "category": "Drama",
          "id_producer": "044QpjQbJchpO1579Ta5Nj89uW62"
      },
      {
          "id": 3,
          "name": "Prince of Pennsylvania, The",
          "url": "http://latimes.com/consectetuer/adipiscing/elit/proin/interdum/mauris.aspx",
          "photoURL": "http://dummyimage.com/200x240.png/ff4444/ffffff",
          "description_short": "Unsp pedl cyclst injured in nonclsn trnsp accident nontraf",
          "description_long": "Sector or arcuate visual field defects",
          "date_start": "28/8/2019",
          "category": "Comedy|Drama",
          "id_producer": "044QpjQbJchpO1579Ta5Nj89uW62"
      },
      {
          "id": 4,
          "name": "Bad Sleep Well, The (Warui yatsu hodo yoku nemuru)",
          "url": "https://va.gov/malesuada/in/imperdiet.js",
          "photoURL": "http://dummyimage.com/176x171.png/dddddd/000000",
          "description_short": "Toxic effect of venom of wasps, undetermined, init encntr",
          "description_long": "Other fall",
          "date_start": "1/4/2020",
          "category": "Drama|Thriller",
          "id_producer": "044QpjQbJchpO1579Ta5Nj89uW62"
      }
  ]
  let data2 =[
    {
        "id": 1,
        "name": "Guy Named Joe, A",
        "url": "https://forbes.com/purus/eu/magna/vulputate/luctus.png",
        "photoURL": "http://dummyimage.com/137x204.png/cc0000/ffffff",
        "description_short": "Congenital malformations of great arteries",
        "description_long": "Second-degree perineal laceration, delivered, with or without mention of antepartum condition",
        "date_start": "17/5/2019",
        "category": "Drama|Fantasy|Romance|War",
        "id_producer": "BjHgqjUetiduExbhB7B4O05ZrMf2"
    },
    {
        "id": 2,
        "name": "Pauline & Paulette (Pauline en Paulette)",
        "url": "http://fc2.com/mattis/odio/donec/vitae.html",
        "photoURL": "http://dummyimage.com/168x156.png/cc0000/ffffff",
        "description_short": "Unsp injury of great saphenous at hip and thi lev, left leg",
        "description_long": "Candidal meningitis",
        "date_start": "21/1/2020",
        "category": "Comedy|Drama",
        "id_producer": "BjHgqjUetiduExbhB7B4O05ZrMf2"
    },
    {
        "id": 3,
        "name": "Knockout",
        "url": "http://who.int/felis/eu/sapien.json",
        "photoURL": "http://dummyimage.com/190x159.png/ff4444/ffffff",
        "description_short": "Encounter for screening for other disorder",
        "description_long": "Referred otogenic pain",
        "date_start": "7/5/2020",
        "category": "Action|Drama",
        "id_producer": "BjHgqjUetiduExbhB7B4O05ZrMf2"
    },
    {
        "id": 4,
        "name": "Mask of Dimitrios, The",
        "url": "http://unblog.fr/porta/volutpat/quam/pede.xml",
        "photoURL": "http://dummyimage.com/214x182.png/ff4444/ffffff",
        "description_short": "Left anterior fascicular block",
        "description_long": "Slow transit constipation",
        "date_start": "18/11/2019",
        "category": "Crime|Drama|Film-Noir|Mystery",
        "id_producer": "BjHgqjUetiduExbhB7B4O05ZrMf2"
    }
]
  data2.forEach(element => {
    this.afs.collection('streamings').add(element)
      .catch(err => console.error( err));
    
  });


  }
}
