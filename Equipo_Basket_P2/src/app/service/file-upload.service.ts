import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private readonly MAX_IMAGE_SIZE_MB = 2; // Máximo MB para imágenes
  private readonly MAX_VIDEO_SIZE_MB = 20; // Máximo MB para videos

  constructor(private storage: Storage) {}

  // Validar el tamaño del archivo
  private validateFileSize(file: File): string | null {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (isImage && file.size > this.MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      return `La imagen supera el tamaño máximo permitido de ${this.MAX_IMAGE_SIZE_MB} MB.`;
    }

    if (isVideo && file.size > this.MAX_VIDEO_SIZE_MB * 1024 * 1024) {
      return `El video supera el tamaño máximo permitido de ${this.MAX_VIDEO_SIZE_MB} MB.`;
    }

    return null; // Archivo válido
  }

  // Método para validar el archivo sin subirlo
  validateFile(file: File): Promise<void> {
    const validationError = this.validateFileSize(file);
    if (validationError) {
      return Promise.reject(validationError);
    }
    return Promise.resolve();
  }

  // Subir archivo a Firebase Storage
  uploadFile(file: File, path: string): Promise<string> {
    // Validar el archivo antes de subirlo
    const validationError = this.validateFileSize(file);
    if (validationError) {
      return Promise.reject(validationError); // Rechazar si el archivo es inválido
    }

    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error), // Manejo de errores
        async () => {
          try {
            // Obtener la URL de descarga al finalizar
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
}

