import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private dbPath = '/players';
  private playersCollection;

  constructor(private firestore: Firestore) {
    this.playersCollection = collection(this.firestore, this.dbPath);
  }

  // Obtener todos los jugadores
  getPlayers(): Observable<any[]> {
    return collectionData(this.playersCollection, { idField: 'id' }) as Observable<any[]>;
  }

  // Obtener un jugador por ID
  getPlayerById(id: string): Observable<any> {
    const playerDocRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return docData(playerDocRef, { idField: 'id' });
  }

  // Agregar un nuevo jugador
  addPlayer(player: any) {
    return addDoc(this.playersCollection, player);
  }

  // Actualizar un jugador existente
  updatePlayer(id: string, player: any) {
    const playerDocRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return updateDoc(playerDocRef, player);
  }

  // Eliminar un jugador
  deletePlayer(id: string) {
    const playerDocRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return deleteDoc(playerDocRef);
  }
}
