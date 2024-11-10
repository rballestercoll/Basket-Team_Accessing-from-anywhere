import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayersService } from '../../service/players.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {
  @Output() cerrarModal = new EventEmitter<void>();

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    num: new FormControl(''),
    position: new FormControl(''),
    age: new FormControl(''),
    anillos: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
    video: new FormControl('')
  });
  submitted = false;
  mensaje: string = '';

  positions = ['Ala-Pivot', 'Alero', 'Base', 'Escolta', 'Pivot'];

  constructor(
    private formBuilder: FormBuilder,
    private PlayerService: PlayersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      num: ['', [Validators.required]],
      position: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(50)]],
      anillos: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      img: ['', Validators.required],
      video: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const playerData = this.form.value;

    this.PlayerService.addPlayer(playerData)
      .then(() => {
        this.mensaje = 'El jugador ha sido creado exitosamente.';

        // Cierra el modal y el mensaje después de 2.5 segundos
        setTimeout(() => {
          this.mensaje = '';
          this.cerrarModalCrear();
        }, 2500);
      })
      .catch((error) => {
        console.error('Error al crear el jugador:', error);
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  cerrarModalCrear() {
    this.form.reset();
    this.cerrarModal.emit();
  }
}
