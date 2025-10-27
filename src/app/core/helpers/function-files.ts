import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [],
  providers: [FunctionFile],
})
export class FunctionFile {
  constructor() {}

  onUpload(file: File): void {
    if (file) {
      const formData = new FormData();
      formData.append('image', file, file.name);

      // Enviar la imagen al servidor (si es necesario)
      // Aquí puedes hacer una solicitud HTTP utilizando Angular HttpClient

      // Guardar la imagen localmente en la ruta del proyecto (por ejemplo, en la carpeta assets)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader?.result?.toString().split(',')[1];
        if (base64String) {
          const byteArray = atob(base64String);
          const uint8Array = new Uint8Array(byteArray.length);
          for (let i = 0; i < byteArray.length; i++) {
            uint8Array[i] = byteArray.charCodeAt(i);
          }
          const blob = new Blob([uint8Array], { type: file.type });

          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      };
    }
  }
}
