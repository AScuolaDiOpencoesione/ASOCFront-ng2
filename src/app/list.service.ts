import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ListService {

    private itemChange: EventEmitter<any> = new EventEmitter();
    
    constructor() {}

    item:any;
    
    setItem(item:any){
        this.item = item;
        this.itemChange.next(this.item);
    }
    
    getItemChangeEmitter(){
        return this.itemChange;
    }
}
