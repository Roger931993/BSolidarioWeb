import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@web/../environments/environment';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public languages: string[] = ['en', 'es', 'de', 'it', 'ru'];

  constructor(
    public translate: TranslateService,
    private cookieService: CookieService
  ) {
    let browserLang;
    this.translate.addLangs(this.languages);
    if (this.cookieService.check('lang')) {
      browserLang = this.cookieService.get('lang');
    } else {
      this.setLanguage(environment.lang);
      browserLang = translate.getBrowserLang();
    }

    translate.use(
      browserLang.match(/en|es|de|it|ru/) ? browserLang : environment.lang
    );
  }

  public setLanguage(lang) {
    this.translate.use(lang);
    this.cookieService.set('lang', lang);
  }
}
