import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import {Player} from "../model/players";

@Injectable({
  providedIn: 'root'
})

export class PlayersService {
  private dbPath = '/players';

  private imgName: string = '';
  private videoName: string = '';

  constructor(private firestore: Firestore) {}

  getPlayers(): Observable<any> {
    return collectionData(collection(this.firestore, this.dbPath), { idField: 'id' });
  }

  getPlayerById(id: any): Observable<any> {
    return docData(doc(this.firestore, this.dbPath + '/' + id));
  }

  async addPlayer(data: any) {
    const playersCollection = collection(this.firestore, this.dbPath);
    const docRef = await addDoc(playersCollection, data);
    await updateDoc(docRef, { id: docRef.id });
  }


  async edit(id: any, data: any) {
    await updateDoc(doc(this.firestore, this.dbPath + '/' + id), data);
  }

  async deletePlayer(id: any) {
    await deleteDoc(doc(this.firestore, this.dbPath + '/' + id));
  }



}
