import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@web/../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MattermostLoggerService {
  private webhookUrl = environment.api_bugs;

  constructor(private http: HttpClient) {}

  sendError(message: string, extraInfo?: any) {
    const payload = {
      text:
        `🐞 *Nuevo Error Detectado en la App Hiefer:*\n` +
        `**Mensaje:** ${message}\n` +
        (extraInfo
          ? `**Detalles:** \n\`\`\`${JSON.stringify(extraInfo, null, 2)}\`\`\``
          : ""),
    };

    return this.webhookUrl
      ? this.http.post(this.webhookUrl, payload).subscribe({
          next: () => console.log("Error enviado a Mattermost"),
          error: (err) => console.error("Error al enviar a Mattermost", err),
        })
      : null;
  }
}
