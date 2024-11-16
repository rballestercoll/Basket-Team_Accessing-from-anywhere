import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal d-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" (click)="onCancel()"></button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancelar</button>
            <button type="button" class="btn btn-danger" (click)="onConfirm()">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent {
  @Input() title: string = 'Confirmar Eliminación';
  @Input() message: string = '¿Estás seguro de que deseas eliminar este elemento?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit(); // Emite el evento de confirmación
  }

  onCancel() {
    this.cancel.emit(); // Emite el evento de cancelación
  }
}

