import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { SubscribeService } from './subscribe.service';
import { Usuario } from '../shared/model/usuario.model';
import { Estados } from '../shared/estados';

@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.component.html',
    styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

    proximosEventos = [];
    opcoesEvento = [];
    igrejas = [];
    estados = Estados;
    user: Usuario;

    eventId = null;
    eventOptionId = null;
    eventOptionName = null;
    filename = null;
    isCpfRegistered = false;
    isCPFError = false;
    showForms = false;
    isAvailableNivel = false;
    isAvailableColchao = false;
    isComplete = false;

    userFormGroup = this._formBuilder.group({
        cpf: ['', Validators.required],
        nome: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        telefone: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        estado: ['', Validators.required],
        cidade: ['', Validators.required],
        sexo: ['', Validators.required],
    });
    subscribeuserFormGroup = this._formBuilder.group({
        nivel: ['', Validators.required],
        idIgreja: [''],
        necessidade: [''],
        contatoUrgencia: [''],
        nomeContatoUrgencia: [''],
        aluguelColchao: ['', Validators.required],
        valorPago: ['', Validators.required]
    });
    
    constructor(private ngxService: NgxUiLoaderService,
        private _formBuilder: FormBuilder,
        private subscribeService: SubscribeService,
        public snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.ngxService.start();
        this.subscribeService.listaProximosEventos()
        .subscribe(data => {
            this.proximosEventos = data;
            this.ngxService.stop();
        });
    }

    listaOpcoes(idEvento) {
        this.eventId = idEvento;
        this.subscribeService.listaOpcoes(idEvento)
        .subscribe(data => {
            this.opcoesEvento = data.valores;
            this.igrejas = data.igrejas;
        });
    }

    setEventOption(option) {
        this.eventOptionId = option.idValor;
        this.eventOptionName = option.nomeValor;
        this.isAvailableNivel = !!option.nivel;
        this.isAvailableColchao = !!option.colchao;
    }

    checkCpf() {
        const cpfNumber = this.userFormGroup.value.cpf;

        this.isCPFError = false;
        if (!this.isValidCPF(cpfNumber)) {
            this.isCPFError = true;
            return;
        }
        this.subscribeService.checkCpf(cpfNumber)
        .subscribe((data: any) => {
            this.isCpfRegistered = data.count > 0;
            this.user = data.user;
        });
        this.showForms = true;
    }

    isValidCPF(cpf) {
        if (typeof cpf !== 'string') return false
        cpf = cpf.replace(/[^\d]+/g, '')
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
        cpf = cpf.split('').map(el => +el)
        const rest = (count) => (cpf.slice(0, count-12)
            .reduce( (soma, el, index) => (soma + el * (count-index)), 0 )*10) % 11 % 10
        return rest(10) === cpf[9] && rest(11) === cpf[10]
    }

    onFileChange(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          const file = fileList[0];
          const form = new FormData();
          form.append('comprovante_file', file, file.name);
          this.subscribeService.sendFile(form)
          .subscribe(data => {
            this.filename = data.filename;
          },
          (errorResponse: HttpErrorResponse) => {
            console.error(errorResponse);
            this.snackBar.open('Não foi possível enviar o comprovante. Tente novamente', 'Ok');
          });
        }
      }

    onSubmit() {
        this.isComplete = false;
        if (this.isCpfRegistered) {
            this.userFormGroup.controls['password'].setValue(null);
        }

        const evento = { idEvento: this.eventId, idValor: this.eventOptionId, filename: this.filename };
        const data = Object.assign(evento, this.userFormGroup.value, this.subscribeuserFormGroup.value);
        this.subscribeService.save(data)
        .subscribe(() => {
            this.isComplete = true;
        },
        (errorResponse: HttpErrorResponse) => {
            console.error(errorResponse);
            this.snackBar.open('Houve um erro. Tente novamente', 'Ok');
        });
    }

    newSubscribe() {
        this.isComplete = false;
        this.showForms = false;
        this.userFormGroup.reset();
        this.subscribeuserFormGroup.reset();
    }

}
