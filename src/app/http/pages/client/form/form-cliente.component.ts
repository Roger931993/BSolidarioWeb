import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import {
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommonModule, formatDate } from "@angular/common";
import { Cliente, CreateCliente } from "@web/core/models/cliente.model";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { Select2Data, Select2Module, Select2Value } from "ng-select2-component";
import { ClienteService } from "@web/core/services/app/cliente.service";
import { ValidationErrorComponent } from "@web/shared/validation-error/validation-error.component";

@Component({
  standalone: true,
  selector: "app-form-cliente",
  templateUrl: "./form-cliente.component.html",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule,
    Select2Module,
    ValidationErrorComponent,
  ],
})

/**
 * Forms Validation component
 */
export class FormClienteComponent implements OnInit {
  @Input({ required: true }) Cliente: Cliente | null = null;
  @Output() confirmSave = new EventEmitter();
  @Output() closeModal = new EventEmitter();

  private toastr = inject(ToastrService);
  private service = inject(ClienteService);

  form: UntypedFormGroup;
  data: CreateCliente;
  typesubmit: boolean;

  DataOrganizationType: Select2Data = [];
  OrganizationTypeEdit;
  overlay = false;

  constructor(public formBuilder: UntypedFormBuilder, private router: Router) {
    this.buildForm();
  }

  async ngOnInit(): Promise<void> {
    this.typesubmit = false;
    this.form.patchValue(this.Cliente);
  }

  get type() {
    return this.form.controls;
  }

  submit() {
    this.typesubmit = true;

    if (this.form.valid) {
      const info: CreateCliente = this.form.value;

      if (!this.Cliente?.cliente_id) {
        this.save(info);
      } else {
        this.update(info);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  async save(info: CreateCliente): Promise<void> {
    const res = await this.service.createAsync(info);
    if (res) {
      this.confirmSave.emit("Registro guardado exitosamente!!!!");
    }
  }

  async update(info: CreateCliente): Promise<void> {
    const res = await this.service.updateAsync(this.Cliente.cliente_id, info);

    if (res) {
      this.confirmSave.emit(res);
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      primer_nombre: ["", [Validators.required]],
      segundo_nombre: ["", [Validators.required]],
      apellido_paterno: ["", [Validators.required]],
      apellido_materno: ["", [Validators.required]],
      identificacion: ["", [Validators.required]],
      user_name: [""],
    });
  }

  close() {
    this.closeModal.emit("close");
  }

  setOrganizationType(event) {
    this.type.cat_organization_type_id.setValue(event.value);
  }
}
