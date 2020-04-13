import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService, User } from '../../../services/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css']
})
export class PostBlogComponent implements OnInit {
  blogFrom: FormGroup;
  user: Observable<User>;
  constructor(private _Http: HttpService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.blogFrom = this.formBuilder.group({
      hiddenName: [''],
      name: [''],
      heading: [''],
      message: ['']
    });
  }

  sendMessage(message) {
    console.log(message);
    console.log(message);
    console.log(JSON.stringify(message));
    this._Http.postBlog(JSON.stringify(message)).subscribe(
      res => {
        //   console.log("Contact form done", res);
        return res;
      },
      err => {
        //  console.log('There was an error', err);
        return err;
      }
    );
    this.blogFrom.reset();
  }
}
