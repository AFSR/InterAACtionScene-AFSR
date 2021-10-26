import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {LanguageService} from '../../services/language.service';
import {Router} from "@angular/router";
import {ScenesService} from "../../services/scenes.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService,
              public scenesService: ScenesService,
              public languageService: LanguageService,
              public router: Router) { }

  ngOnInit(): void {
    let lang = location.href.substring(24,26);
    this.languageService.switchLanguage(lang);
  }
  backEn(){
    this.router.navigate(['en/dashboard']);
  }
  backFr(){
    this.router.navigate(['fr/dashboard']);
  }

  getAFSRLogoPNGUrl(s): string {
    return 'url(assets/images/'+ s +'.png)';
  }

  saveConfig() {
    setTimeout(() => this.scenesService.updateConfig(),50);
  }
}
