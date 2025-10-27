import { Injectable, inject, signal } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { User, CreateUser } from '@web/core/models/user.model';
import { environment } from '@web/../environments/environment';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  url_get: string = environment.apiUrl + '/api/User';
  url_post: string = environment.apiUrl + '/api/User';
  url_delete: string = environment.apiUrl + '/api/User';
  url_update: string = environment.apiUrl + '/api/User';

  app: any;
  db: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  getAll() {
    return this.http.get<User[]>(this.url_get);
  }

  create(data: CreateUser) {
    // await this.getDocumentUser(data).then((res) => {
    //   data.name = data.firstName + ' ' + data.lastName;

    //   const docRef = doc(this.db, 'users', res.uid);
    //   setDoc(docRef, data, { merge: true });

    //   data.password = res.uid;
    //   data.uid = res.uid;
    // });

    return this.http.post<any>(this.url_post, data);
  }

  update(Id: number, data: CreateUser) {
    return this.http.put<any>(`${this.url_update}/${Id}`, data);
  }

  delete(Id: number) {
    // await this.getDocumentUser(user).then((res) => {
    //   user.name = user.firstName + ' ' + user.lastName;
    //   user.status = 0;
    //   const docRef = doc(this.db, 'users', res.uid);
    //   setDoc(docRef, user, { merge: true });
    // });

    // return this.http.delete<void>(`${this.url_delete}/${Id}`);
    // .subscribe({
    //   error: (err) => {
    //     this.toastr.error(
    //       `por favor, inténtelo de nuevo más tarde. ${err}`,
    //       'Algo malo sucedió!!!!'
    //     );
    //   },
    // });

    return this.http.delete<void>(`${this.url_delete}/${Id}`);
  }

  async getDocumentUser(user: CreateUser) {
    const q = query(
      collection(this.db, 'users'),
      where('email', '==', user.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      var data = doc.data() as CreateUser;
      user.password = data.uid;
      user.uid = data.uid;
    });

    return user;
  }
}
