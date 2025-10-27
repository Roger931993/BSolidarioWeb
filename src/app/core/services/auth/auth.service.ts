import { Injectable, NgZone, inject } from "@angular/core";
import { User } from "@web/core/services/auth/user";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CreateUser } from "@web/core/models/user.model";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Login } from "./user";
import { ToastrService } from "ngx-toastr";
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { environment } from "@web/../environments/environment";
import { FirebaseApp } from "@angular/fire/app";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  // userData: any;
  // private serviceUser = inject(UserService);
  private toastr = inject(ToastrService);
  public afs = inject(AngularFirestore); // Inject Firestore service
  public afAuth = inject(AngularFireAuth); // Inject Firebase auth service
  public router = inject(Router);
  public ngZone = inject(NgZone); // NgZone service to remove outside scope warning // private toastr: ToastrService

  app: any;
  db: any;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(this.app);

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe((user) => {
    // if (user) {
    //   console.log('entro');
    //   this.userData = user;
    //   // localStorage.setItem('currentUser', JSON.stringify(this.userData));
    // } else {
    //   localStorage.setItem('currentUser', 'null');
    //   localStorage.setItem('userData', 'null');
    // }
    // });
  }

  ngOnInit() {}

  async SignIn(login: Login) {
    await this.afAuth
      .signInWithEmailAndPassword(login.email, login.password)
      .then((result) => {
        this.afAuth.authState.subscribe({
          next: (user) => {
            if (user) {
              this.SetUserData(user).then((userDoc: User) => {
                if (userDoc?.status == 0) {
                  this.SignOut();
                  this.toastr.warning(
                    `Este usuario se encuentra desactivado por favor contactarse con un administrador`,
                    "Acceso restringido"
                  );
                } else {
                  localStorage.setItem("currentUser", JSON.stringify(user));
                  localStorage.setItem("userData", JSON.stringify(userDoc));
                  this.router.navigate(["/"]);
                }
              });
            }
          },
          error: (er) => {
            console.error("OK", er);
            this.SignOut();
          },
        });
      });
  }

  async ForgotPassword(passwordResetEmail: string) {
    await this.afAuth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      // this.toastr.success(
      //   'Se ha enviado correo para recuperar su contraseña. Revise su bandeja de entrada.'
      // );
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      // console.log(localStorage.getItem('userData'));
      // console.log(localStorage.getItem('currentUser'));
      // return false;

      localStorage.removeItem("userData");
      localStorage.removeItem("currentUser");

      this.router.navigate(["/auth/login"], {
        skipLocationChange: true,
      });
    });
  }

  async SignUp(userForm: CreateUser) {
    await this.afAuth
      .createUserWithEmailAndPassword(userForm.email, userForm.password)
      .then((fire) => {
        //this.SendVerificationMail();
        this.CreateUserData(fire.user, userForm);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {});
  }

  async SetUserData(user: any) {
    let data: any;
    const q = query(collection(this.db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data = doc.data();
    });

    return data;
  }

  CreateUserData(user: any, userForm: CreateUser) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    userForm.uid = user.uid;
    userForm.name = userForm.firstName + " " + userForm.lastName;

    return userRef.set(userForm, {
      merge: true,
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user !== null /*&& user.emailVerified !== false*/ ? true : false;
  }
}
