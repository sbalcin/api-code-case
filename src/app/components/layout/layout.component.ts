import {Component, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {NavData, navItems} from './_nav';
import {AuthService} from '../../services/auth.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  public navItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;

  constructor(public authService: AuthService, private router: Router, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element> this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    const navs: NavData[] = new Array();
    navs.push(...navItems);
    this.navItems = navs;
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  tryLogout() {
    this.authService.signOutUser();
  }

}
