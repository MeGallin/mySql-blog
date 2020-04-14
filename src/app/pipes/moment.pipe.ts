import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "momentPipe",
})
export class MomentPipe implements PipeTransform {
  transform(value: Date | moment.Moment, dateFormat: string): any {
    return moment(value).fromNow();
  }
}
