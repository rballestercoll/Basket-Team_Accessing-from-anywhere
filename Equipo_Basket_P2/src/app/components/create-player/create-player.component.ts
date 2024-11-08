import { Component, OnInit } from '@angular/core';
import {PlayersService} from '../../service/players.service';
import { CommonModule } from '@angular/common';
import { Player } from '../../model/players';
import { ReactiveFormsModule, AbstractControl, FormControl, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';
import Validation from '../../utils/validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css'
})
export class CreatePlayerComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    num: new FormControl(''),
    position: new FormControl(''),
    age: new FormControl(''),
    anillos: new FormControl(''),
    description: new FormControl(''),
  });
  submitted = false;
  modalOpenCrear = true;
  mensaje: string = '';

  public fileImage: any;
  public fileVideo: any;

  public urlCompletaImagen: string='';
  public urlCompletaVideo: string='';

  public player = {
                name: '',
                num: 0,
                position: '',
                age: '',
                anillos: '',
                description: '',
                img: '',
                video: '',
                imgName: '',
                videoName: ''
              };

  positions = ['Ala-Pivot', 'Alero', 'Base', 'Escolta', 'Pivot'];

  constructor(
    private formBuilder: FormBuilder,
    private PlayerService:PlayersService,
    private storage: Storage,
    private storage2: Storage,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        name: ['',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        num: [
          '',
          [
            Validators.required,
          ]
        ],
        position: ['', Validators.required],
        age: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
          ]
        ],
        anillos: [
          '',
          [
            Validators.required
          ]
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(30),
          ]
        ],
      }
    );

  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ficheroCompleto($event: any)
  {
    this.fileImage=$event.target.files[0];
    this.player.imgName = $event.target.files[0].name;


  }

  videoCompleto($event: any)
  {
    this.fileVideo=$event.target.files[0];
    this.player.videoName = $event.target.files[0].name;
  }


  async formularioEnviado(){

    const imgRef=ref(this.storage,'images/' + this.fileImage.name);
    //const viedoRef=ref(this.storage2, 'videos/' + this.fileVideo.name);
    const videoRef=ref(this.storage, 'videos/' + this.fileVideo.name);

    uploadBytes(imgRef,this.fileImage)
    .then(response =>{
       this.getImages();
    })
    .catch(error => console.log(error));

    uploadBytes(videoRef,this.fileVideo)
    .then(response =>{
       this.getVideos();
     //  this.guardarDatos();
    })
    .catch(error => console.log(error));
  }

  getImages() {
    const imgItem=ref(this.storage,'images');
    urlImagen: String;

    listAll(imgItem)
      .then( async response => {
        for (let item of response.items)
          {
            // console.log('Item IMAGEN:' + item.name);
            // console.log('this.FILEIMAGE: '+ this.fileImage.name);
            if (this.fileImage.name==item.name){
              //console.log('Imagen Encontrada: ' + item.name);
              const url = await getDownloadURL(item)
              console.log('irl imagen: ' + url.toString());
              this.player.img = url.toString();

              //this.guardarDatos();


            }
          }
      })
      .catch(error =>console.log("Error getImages: " + error));
  }

  getVideos()
  {
    const imgItem=ref(this.storage2,'videos');
    urlVideo: String;

    listAll(imgItem)
      .then( async response => {
        for (let item of response.items)
          {
            console.log('Item Video:' + item.name);
            console.log('this.Filevideo: '+ this.fileVideo.name);
            if (this.fileVideo.name==item.name){
              //console.log('Video Encontrado ' + item.name);
              const url = await getDownloadURL(item)
              console.log('url video: ' + url.toString());
              this.player.video=url.toString();
              this.guardarDatos();


            }
          }
      })
      .catch(error =>console.log("Error en getVideos: " + error));
  }

  async guardarDatos()
  {
    console.log(this.player);
    console.log(this.player.imgName);
    if (this.player.img.trim()!='' && this.player.video.trim()!='')
      {
        await this.PlayerService.addPlayer(this.player);
        this.fileImage='';
        this.fileVideo='';
      }

      this.player = {
        name: '',
        num: 0,
        position: '',
        age: '',
        anillos: '',
        description: '',
        img: '',
        video: '',
        imgName: '',
        videoName: ''
      };


  }


  onSubmit(): void {
    this.submitted = true;

    console.log(this.form);

    if (this.form.status == 'INVALID') {
      return;
    }



    this.player = this.form.value;
    this.mensaje = 'El jugador ha sido creado exitosamente.';

    // Cierra el modal y el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensaje = '';

      // Código para cerrar el modal aquí

      this.cerrarModalCrear();
    }, 2500);

    this.formularioEnviado();

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  cerrarModalCrear() {

    this.form.reset();
    const modal = document.querySelector('.modalCrear');
    if (modal) {
      modal.classList.remove('d-block');

    }
  }
}
