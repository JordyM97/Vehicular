import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { ChatRoom } from '../interfaces/chat-room';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatCollection: AngularFirestoreCollection<any>;
  private chatRooms: Observable<any[]>;;

  private messagesCollection: AngularFirestoreCollection<any>;
  public messages: Observable<any[]>;


  private locationCollection: AngularFirestoreCollection<any>;
  public locations: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,

  ) {
    this.chatCollection = this.afs.collection<any>('chatRoomsTest');
    this.chatRooms = this.chatCollection.snapshotChanges();
    this.locationCollection = this.afs.collection<any>('location');
    this.locations= this.chatCollection.snapshotChanges();
   }

  getChatRooms(){
    return this.chatRooms.pipe(
      map(
        rooms => {
          return rooms.map(
            item => {
              const data: ChatRoom = item.payload.doc.data() as ChatRoom;
              data.id=item.payload.doc.id;
              return data;
            }
          ).filter(data => {
              console.log('ChatRoom.id > ',data.id);
              let uids =data.id.split('-');
              let uidProv= uids[0];
              let uidOther= uids[1];
              let uidCurrent = "G8i5HhWk1OQx9JwLmilYSAlJyHC2";
              console.log("G8i5HhWk1OQx9JwLmilYSAlJyHC2");
              return (uidCurrent===uidProv || uidCurrent==uidOther)
              
          });
        }
      )
    )
  }

  getMessages(chatRoom:string){
    console.log('cg> ',chatRoom)
    this.messagesCollection = this.afs.collection<any>(`/chatRoomsTest/${chatRoom}/messages`,(ref)=>ref.orderBy('createdAt'));
    return this.messagesCollection.valueChanges();
  }
  addPosition(id:string,location:string){
    this.afs.collection(`/posicion/${id}`, ref => ref.where('id', "==", id)).snapshotChanges().subscribe(res => {
      if (res.length > 0)      {
        this.afs.doc(`/posicion/${id}`).set({ location: location }, { merge: true });
      }
      else{
        this.afs.doc(`/posicion/${id}`).update(
          {
            location: location ,
            from: this.authService.nombre,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          }
        );
      }
  });  
  }
 
  addChatMessage(chatRoom:string,msg:string){
    return this.afs.collection(`/chatRoomsTest/${chatRoom}/messages`).add(
      {
        msg,
        from: "G8i5HhWk1OQx9JwLmilYSAlJyHC2",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }
    );
  }
}
