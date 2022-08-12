import { Component, OnInit } from '@angular/core';
import { CRUDService } from '@app/_services/crud.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {
    form: any = {
        name: null,
        content: null
    };
    postsData: any;
    showModal = false;
    selectedId = 0;

    constructor(private crudService: CRUDService) {}

    ngOnInit(): void {
        this.getList();
    }

    reloadList(_boolean) {
        // if (_boolean) this.getList();
        window.location.reload();
    }

    getList() {
        this.crudService.list().subscribe(
            (data) => {
                this.postsData = data;
                console.log('data', data);
            },
            (err) => {}
        );
    }
}
