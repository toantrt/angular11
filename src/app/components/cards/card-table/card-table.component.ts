import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-table',
    templateUrl: './card-table.component.html'
})
export class CardTableComponent implements OnInit {
    showModal = false;
    newPost = '';
    selectedId = 0;
    isDelete = false;
    @Input() items: {};
    get color(): string {
        return this._color;
    }
    set color(color: string) {
        this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
    }
    private _color = 'light';

    @Output() reloadListEvent = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    toggleModal(_id = 0, _delete = false) {
        console.log('_id', _id);
        this.selectedId = _id;
        this.showModal = !this.showModal;
        this.isDelete = _delete;
        // this.newPost = "New Post";
    }

    reloadList(_boolean: boolean) {
        this.reloadListEvent.emit(_boolean);
    }

    updateToggle(_toggle: boolean) {
        this.showModal = _toggle;
    }
}
