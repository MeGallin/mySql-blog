import { Component, OnInit } from "@angular/core";
import { HttpService, User } from "../../../services/http.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public blog = [];
  selectedBlog = { id: null, name: null, heading: null, message: null };
  public showForm: boolean = false;
  public formArray = [];
  constructor(private _Http: HttpService) {}

  ngOnInit(): void {
    setInterval(() => {
      this._Http.getBlog().subscribe((res) => {
        // console.log(res);
        this.blog = res;
      });
    }, 1000);
  }

  deleteBlog(id) {
    this._Http.DeleteBlog(id).subscribe((res) => {
      console.log("Deleted", id, res);
    });
  }

  handleEdit(form) {
    const newForm = {
      id: form.id.value,
      name: form.name.value,
      heading: form.heading.value,
      message: form.message.value,
    };

    this._Http.updateBlog(newForm).subscribe((message) => {
      console.log("form updated", message);
    });

    form.name.value = "";
    form.heading.value = "";
    form.message.value = "";
  }

  openEditForm(form) {
    this.showForm = true;
    this.formArray = [{ ...form }];
    console.log(this.formArray);
  }
}
