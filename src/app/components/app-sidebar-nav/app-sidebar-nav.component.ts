import { Component, ElementRef, Input, OnInit, Renderer2, ComponentRef } from '@angular/core';

import { Project } from '../../shared/models/project.model';
import { Router } from '@angular/router';

import { ProjectService } from '../../services/project.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  template: `
    <nav class="sidebar-nav">
      <ul class="nav">
        <ng-template ngFor let-navitem [ngForOf]="navigation">
          <li *ngIf="isDivider(navitem)" class="nav-divider"></li>
          <ng-template [ngIf]="isTitle(navitem)">
            <app-sidebar-nav-title [title]='navitem'></app-sidebar-nav-title>
          </ng-template>
          <ng-template [ngIf]="!isDivider(navitem)&&!isTitle(navitem)">
            <app-sidebar-nav-item [item]='navitem'></app-sidebar-nav-item>
          </ng-template>
        </ng-template>
      </ul>
    </nav>`
})
export class AppSidebarNavComponent implements OnInit {

  defaultHeader = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-layers',
    },
    {
      name: 'Projects',
      title: true,
    }
  ];

  defaultFooter = [
    {
      name: 'Administration',
      title: true,
    },
    {
      name: 'Hardware',
      url: '/hardware',
      icon: 'icon-wrench',
      children: [
        {
          name: 'Paired devices',
          url: '/paired',
          icon: 'icon-rocket',
        },
        {
          name: 'Stock',
          url: '/stock',
          icon: 'icon-basket',
        },
        {
          name: 'Templates',
          url: '/templates',
          icon: 'icon-briefcase',
        }
      ],
    },
    {
      name: 'Users',
      url: '/#',
      icon: 'icon-user',
    },
    {
      name: 'Devices Tree',
      url: '/all-devices',
      icon: 'icon-settings',
    }
  ];

  sidebarMenu = [];
  navigation;

  constructor(private projectService: ProjectService) {
  }

  async ngOnInit() {

    this.projectService.getProjects().subscribe(p => {
      p.forEach(project => {
        const children = [];

        children.push({
          name: 'Chart',
          url: '/chart/' + project.id,
          icon: 'icon-chart'
        })

        project.devices.forEach(
          devices => {
            children.push(
              {
                name: devices.name,
                url: '/cloud-connects/' + devices.name,
                icon: 'icon-cloud-download'
              }
            );
          });

        children.push({
          name: 'Devices',
          url: '/devices-tree/' + project.id,
          icon: 'icon-organization'
        })

        this.sidebarMenu.push({
          name: project.name,
          url: '/chart/' + project.id,
          icon: 'icon-home',
          children: children
        });
      })
      this.getMenuItems();
    })

  }

  getMenuItems() {
    const addedHeader = this.defaultHeader.concat(this.sidebarMenu);
    this.navigation = addedHeader.concat(this.defaultFooter);
  }
  public isDivider(item): boolean {
    return item.divider
  }

  public isTitle(item): boolean {
    return item.title
  }
}


@Component({
  selector: 'app-sidebar-nav-item',
  template: `
    <li *ngIf="!isDropdown(); else dropdown" [ngClass]="hasClass() ? 'nav-item ' + item.class : 'nav-item'">
      <app-sidebar-nav-link [link]='item'></app-sidebar-nav-link>
    </li>
    <ng-template #dropdown>
      <li [ngClass]="hasClass() ? 'nav-item nav-dropdown ' + item.class : 'nav-item nav-dropdown'"
          [class.open]="isActive()"
          routerLinkActive=""
          appNavDropdown>
        <app-sidebar-nav-dropdown [link]='item'></app-sidebar-nav-dropdown>
      </li>
    </ng-template>
    `
})
export class AppSidebarNavItemComponent {
  @Input() item: any;

  public hasClass() {
    return this.item.class ? true : false
  }

  public isDropdown() {
    return this.item.children ? true : false
  }

  public thisUrl() {
    return this.item.url
  }

  public isActive() {
    return this.router.isActive(this.thisUrl(), false)
  }

  constructor(private router: Router) { }

}

@Component({
  selector: 'app-sidebar-nav-link',
  template: `
    <a *ngIf="!isExternalLink(); else external"
      [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'"
      routerLinkActive="active"
      [routerLink]="[link.url]">
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      {{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ng-template #external>
      <a [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'" href="{{link.url}}">
        <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
        {{ link.name }}
        <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
      </a>
    </ng-template>
  `
})
export class AppSidebarNavLinkComponent {
  @Input() link: any;

  public hasVariant() {
    return this.link.variant ? true : false
  }

  public isBadge() {
    return this.link.badge ? true : false
  }

  public isExternalLink() {
    return this.link.url.substring(0, 4) === 'http' ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  constructor() { }
}

@Component({
  selector: 'app-sidebar-nav-dropdown',
  template: `
    <a class="nav-link nav-dropdown-toggle" appNavDropdownToggle>
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      {{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ul class="nav-dropdown-items">
      <ng-template ngFor let-child [ngForOf]="link.children">
        <app-sidebar-nav-item [item]='child'></app-sidebar-nav-item>
      </ng-template>
    </ul>
  `
})
export class AppSidebarNavDropdownComponent {
  @Input() link: any;

  public isBadge() {
    return this.link.badge ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  constructor() { }
}

@Component({
  selector: 'app-sidebar-nav-title',
  template: ''
})
export class AppSidebarNavTitleComponent implements OnInit {
  @Input() title: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const li = this.renderer.createElement('li');
    const name = this.renderer.createText(this.title.name);

    this.renderer.addClass(li, 'nav-title');

    if (this.title.class) {
      const classes = this.title.class;
      this.renderer.addClass(li, classes);
    }

    if (this.title.wrapper) {
      const wrapper = this.renderer.createElement(this.title.wrapper.element);

      this.renderer.appendChild(wrapper, name);
      this.renderer.appendChild(li, wrapper);
    } else {
      this.renderer.appendChild(li, name);
    }
    this.renderer.appendChild(nativeElement, li)
  }
}

export const APP_SIDEBAR_NAV = [
  AppSidebarNavComponent,
  AppSidebarNavDropdownComponent,
  AppSidebarNavItemComponent,
  AppSidebarNavLinkComponent,
  AppSidebarNavTitleComponent
];
