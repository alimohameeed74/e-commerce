import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink],
})
export class NavbarComponent implements OnInit {
  showSideBar: WritableSignal<boolean> = signal(false);
  @ViewChild('toggler') toggler!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;
  constructor() {}

  ngOnInit() {}

  toggleSideBar() {
    this.showSideBar.update((e) => !e);
  }
  closeSideBar() {
    this.showSideBar.set(false);
  }
  @HostListener('document:click', ['$event']) function(e: Event) {
    if (
      !this.toggler.nativeElement.contains(e.target) &&
      !this.sidebar.nativeElement.contains(e.target)
    )
      this.closeSideBar();
  }
}
