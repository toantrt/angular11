import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { CRUDService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { first } from 'rxjs/operators';

import {
    AbstractControlOptions,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
    // template: ``
})
export class ModalComponent implements OnInit {
    // @Input() showModal = false;
    form!: FormGroup;
    loading = false;
    isAddMode = false;
    submitted = false;

    @Input() updateId: '';
    @Input() isDelete: false;

    @Input()
    get showModal(): boolean {
        return this._showModal;
    }
    set showModal(showModal: boolean) {
        this._showModal = showModal === undefined ? false : showModal;
    }
    private _showModal = false;

    get modalTitle(): string {
        return this.isDelete
            ? 'Delete post'
            : this.selectedId
            ? 'Update Post'
            : 'New Post';
    }
    set modalTitle(modalTitle: string) {
        this._modalTitle =
            modalTitle === undefined ? 'Update Post' : modalTitle;
    }
    private _modalTitle = '';

    @Input()
    get selectedId() {
        return this._selectedId;
    }
    set selectedId(value: number) {
        this._selectedId = value;
        if (value) this.getPost();
    }
    private _selectedId = 0;

    //   @Output("checkedChange") change = new EventEmitter<string>();
    @Output() toggleModalEvent = new EventEmitter<boolean>();
    @Output() reloadListEvent = new EventEmitter<boolean>();

    constructor(
        private crudService: CRUDService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        // password not required in edit mode
        // const passwordValidators = [Validators.minLength(6)];
        // if (this.isAddMode) {
        //     passwordValidators.push(Validators.required);
        // }

        // const formOptions: AbstractControlOptions = {
        //     validators: MustMatch('password', 'confirmPassword')
        // };

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            content: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.form.controls;
    }

    toggleModal() {
        // console.log('this.selectedId', this.selectedId);
        this.showModal = !this.showModal;
        this.toggleModalEvent.emit(this._showModal);
        this.form.reset();
    }

    getPost() {
        // console.log('e');
        this.crudService
            .getById(this.selectedId)
            // .getById(4)
            .pipe(first())
            .subscribe((x) => this.form.patchValue(x));
    }

    onSubmit() {
        // console.log('test');
        // this.alertService.success('User added', { keepAfterRouteChange: true });

        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        console.log('this.form.invalid', this.form.invalid);
        console.log('this.form.invalid', this.form);

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        if (this.isDelete) {
            this.deletePost();
        } else {
            if (!this._selectedId) {
                this.createPost();
            } else {
                this.updatePost();
            }
        }

        this.toggleModal();
        this.reloadListEvent.emit(true);
    }

    createPost() {
        this.crudService
            .create(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Post added!', {
                    keepAfterRouteChange: true
                });
                // this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => (this.loading = false));
    }

    deletePost() {
        this.crudService
            .delete(this._selectedId)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Post deleted!', {
                    keepAfterRouteChange: true
                });
                // this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => (this.loading = false));
    }

    updatePost() {
        this.crudService
            .update(this._selectedId, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Post updated!', {
                    keepAfterRouteChange: true,
                    autoClose: false
                });
                // this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => (this.loading = false));
    }
}
