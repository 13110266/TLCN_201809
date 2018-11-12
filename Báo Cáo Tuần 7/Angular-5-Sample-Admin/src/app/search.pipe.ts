import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value, term): any {
     console.log('567890')
      console.log(value)
 if (value==null) {
      return null;
  }
   if (term=='') {
      return null;
   }
    return value.filter(item => item.word.startsWith(term));
  }
}
export class Model {
  _id: string
  word: string
  mean: string
  ten: string
  context_w: string
  photo: string
  topic: string
  stt: string
  doc: string
  dn: string
}