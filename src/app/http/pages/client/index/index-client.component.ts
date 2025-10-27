import { Component } from "@angular/core";

@Component({
  selector: "app-index-client",
  templateUrl: "./index-client.component.html",
  styleUrl: "./index-client.component.css",
})
export class IndexClientComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Inicio" },
      { label: "Proyecto", active: true },
    ];
  }
}
