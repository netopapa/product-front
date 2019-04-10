import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class FeedbackService {

  constructor(public snackBar: MatSnackBar) { }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'OK!', {
      duration: 2000,
      panelClass: ['success'],
    });
  }

}
