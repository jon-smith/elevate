import { Component, OnInit } from '@angular/core';
import { appRoutes } from "./app-routes";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import * as _ from "lodash";

export interface MainMenuItem {
	name: string;
	icon: string;
	routerLink: string;
	routerLinkActive: boolean;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	private static updateToolBarTitle(url: string): string {
		return _.startCase(_.upperFirst(_.last(_.split(url, '/'))));
	}

	private _title: string;
	private _mainMenuItems: MainMenuItem[] = [
		{
			name: 'Common Settings',
			icon: 'settings',
			routerLink: appRoutes.commonSettings,
			routerLinkActive: true
		},
		{
			name: 'Athlete Settings',
			icon: 'accessibility',
			routerLink: appRoutes.athleteSettings,
			routerLinkActive: true
		},
		{
			name: 'Zones Settings',
			icon: 'format_line_spacing',
			routerLink: appRoutes.zonesSettings,
			routerLinkActive: true
		}
	];

	constructor(private router: Router) {
	}

	public ngOnInit(): void {

		this._title = AppComponent.updateToolBarTitle(this.router.url);

		this.router.events.subscribe((routerEvent: RouterEvent) => {
			if (routerEvent instanceof NavigationEnd) {
				this._title = AppComponent.updateToolBarTitle(routerEvent.url);
			}
		});
	}

	public onMenuClicked(item: MainMenuItem): void {
		console.log("Clicked %s", item.name);
	}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get mainMenuItems(): MainMenuItem[] {
		return this._mainMenuItems;
	}

}
