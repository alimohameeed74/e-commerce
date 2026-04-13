import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinnerText: WritableSignal<string> = signal('Loading...');
  constructor() {}
  setSpinnerText(text: string) {
    this.spinnerText.set(text);
  }
  resetSpinnerText() {
    this.spinnerText.set('Loading...');
  }
}
