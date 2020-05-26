import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { firestore } from 'firebase/app';
import { Comments } from '../models/comments';
import { StreamingCategory, Streaming } from '../models/streaming';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router,
    private http: HttpClient
  ) { }
  /**
   * Get a stream of the streaming.
   * @param streaming_id - Streaming ID
   */
  getStreamingComments(streaming_id: string) {
    return this.afs.collection('comments', query => query.where('streaming_id', '==', streaming_id)).valueChanges();
  }

  getStreamingInfo(streaming_id: string) {
    return this.afs.collection('streamings', query => query.where('uid', '==', streaming_id)).valueChanges();
  }

  postComment(comment: Comments) {
    return this.afs.collection('comments').add(comment);
  }

  getStreamings(id_producer: string) {
    return this.afs.collection('streamings', query => query.where('id_producer', '==', id_producer)).valueChanges();
  }

  getAllStreamings() {
    return this.afs.collection('streamings', query => query.where('status', '==', true)).valueChanges();
  }
  postStreaming(streaming: Streaming) {
    return this.afs.collection('streamings').add(streaming);
  }

  verifyImage(filePath: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    const body = {
      url: filePath,
    };
    return this.http.post(`${environment.URL_FUNCTIONS}/imageClassification`, body, httpOptions);
  }

  imageClassifier(urlImage: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    const body = {
      url: urlImage,
    };
    return this.http.post(`${environment.URL_FUNCTIONS}/imageStreamingClassifier`, body, httpOptions);
  }

  updateIdStreaming(user) {
    this.afs.collection("streamings").doc(user.id)
      .update({
        uid: user.id
      })
    this.ngZone.run(() => {
      this.router.navigate(['producer/list']);
    });
  }

  increaseDonations(id_streaming: string, quantity: number) {
    this.afs.collection("streamings").doc(id_streaming)
      .update({
        donations: firestore.FieldValue.increment(quantity)
      })
  }
  selectFavorite(id_user: string, id_streaming: string) {
    var docRef = this.afs.collection("user").doc(id_user);
    docRef.update({
      favorite_streamings: firestore.FieldValue.arrayUnion(id_streaming)
    })
    var docRef = this.afs.collection("streamings").doc(id_streaming);
    docRef.update({
      likes: firestore.FieldValue.increment(1)
    })
  }

  deleteStreaming(id_streaming: string) {
    this.afs.collection("streamings").doc(id_streaming).delete()
      .then(() => {
        console.log("Documento eliminado")
      })
  }
  /**
   * Get suggested streamings by user category
   * @param category - Streaming category
   */
  getSuggestedStreamings(category: StreamingCategory) {
    return this.afs.collection("streamings", query => query.where("category", "==", category).where("available", "==", true)).valueChanges();
  }

  getCommentsAnalysis(comments: any[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    const body = {
      comments: comments
    }
    return this.http.post(`${environment.URL_FUNCTIONS}/toneAnalyser`, body, httpOptions);
  }

  finishStreaming(streamingId) {
    return this.afs.collection('streamings').doc(streamingId).update({
      status: false
    })
  }
}
