import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";

@Component({
  selector: "app-view-blog",
  templateUrl: "./view-blog.component.html",
  styleUrls: ["./view-blog.component.css"],
})
export class ViewBlogComponent implements OnInit {
  public blogPosts = [];
  constructor(private _Http: HttpService) {}

  ngOnInit(): void {
    this._Http.getBlog().subscribe((res) => {
      setInterval(() => {
        this.blogPosts = res;
      }, 1000);
    });
  }
}
