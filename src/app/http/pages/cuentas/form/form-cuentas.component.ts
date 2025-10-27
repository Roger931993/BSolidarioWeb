import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Signal,
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
import { CuentaService } from "@web/core/services/app/cuenta.service";
import { ValidationErrorComponent } from "@web/shared/validation-error/validation-error.component";
import { CreateCuenta, Cuenta } from "@web/core/models/cuenta.model";

@Component({
  standalone: true,
  selector: "app-form-cuentas",
  templateUrl: "./form-cuentas.component.html",
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
export class FormCuentasComponent implements OnInit {
  @Input({ required: true }) Cliente: Cliente | null = null;
  @Input({ required: true }) Cuenta: Cuenta | null = null;
  @Output() confirmSave = new EventEmitter();
  @Output() closeModal = new EventEmitter();

  private toastr = inject(ToastrService);
  private service = inject(CuentaService);

  form: UntypedFormGroup;
  data: CreateCuenta;
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
      const info: CreateCuenta = this.form.value;
      info.cliente_id = this.Cliente.cliente_id;
      info.cuenta_id = this.Cuenta.cuenta_id;
      info.moneda = "USD";

      console.log("info cuenta to save", info);

      this.save(info);
    } else {
      this.form.markAllAsTouched();
    }
  }

  async save(info: CreateCuenta): Promise<void> {
    const res = await this.service.createAsync(info);

    if (res) {
      this.confirmSave.emit("Registro guardado exitosamente!!!!");
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      monto: ["", [Validators.required]],
    });
  }

  close() {
    this.closeModal.emit("close");
  }

  setOrganizationType(event) {
    this.type.cat_organization_type_id.setValue(event.value);
  }
}
