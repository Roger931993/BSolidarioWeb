import { Injectable } from '@angular/core';
import { Router, Routes, Route } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private routes: Routes;

  constructor(private router: Router) {
    this.routes = this.router.config;
  }

  getRouteByName(name: string): string {
    return this.findRoutePath(this.routes, name);
  }

  private findRoutePath(routes: Routes, name: string): string {
    let path = '';
    // console.log(routes);

    for (let route of routes) {
      // console.log(route.children);
      // console.log('Data:', route.data, route.children);

      if (route.data && route.data['name'] === name) {
        path = route.path;

        if (route?.data?.parent_path) {
          path = `${route?.data?.parent_path}/${path}`;
        }

        return path;
      } else if (route.children) {
        const childPath = this.findRoutePath(route.children, name);

        if (childPath) {
          return route.path + '/' + childPath;
        }
      }
    }
    return '';
  }

  redirectByName(name: string, params?: {}): void {
    const path = this.getRouteByName(name);
    console.log(path);
    if (path) {
      this.router.navigate([path], params);
    } else {
      console.warn(`Route with name ${name} not found`);
    }
  }
}
