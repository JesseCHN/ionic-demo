import {Component, forwardRef} from '@angular/core';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export const EMOJI_ACCESSOR:any={
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(()=>EmojipickerComponent),
  multi: true
};

@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers: [EMOJI_ACCESSOR]
})


// 实现接口
export class EmojipickerComponent implements ControlValueAccessor{

  emojiArray = [];
  content: string;
  onChanged: Function;
  onTouched: Function;

  constructor(public emoji: EmojiProvider) {
    this.emojiArray = emoji.getEmojis();
  }

  writeValue(obj: any): void {
    this.content = obj;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.content);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(val:any):any {
    this.content +=val;
    if(this.content){
      this.onChanged(this.content);
    }
  }
}
