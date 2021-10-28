import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {LanguageService} from '../../services/language.service';
import {Router} from "@angular/router";
import {ScenesService} from "../../services/scenes.service";
import {MatDialog} from "@angular/material/dialog";
import {AddSceneDialogComponent} from "../add-scene-dialog/add-scene-dialog.component";
import {DisplaySiteASFRComponent} from "../display-site-asfr/display-site-asfr.component";
import {DialogLinkInteraactionboxComponent} from '../dialog-link-interaactionbox/dialog-link-interaactionbox.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService,
              public scenesService: ScenesService,
              public languageService: LanguageService,
              private dialog: MatDialog,
              public router: Router) { }

  ngOnInit(): void {
    let lang = location.href.substring(24,26);
    this.languageService.switchLanguage(lang);
    this.scenesService.loadUserOfUsersList(localStorage.getItem('logged'));
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

  openDialogASFR() {
    this.dialog.open(DisplaySiteASFRComponent,{
      height: '90%',
      width: '90%'
    });
  }

  openDialogInteraactionBoxAFSR(){
    this.dialog.open(DialogLinkInteraactionboxComponent,{
      height: '90%',
      width: '90%'
    });
  }
}
