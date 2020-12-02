import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { ScenesService } from '../../services/scenes.service';
import {ModeService} from "../../services/mode.service";
import {Hotspot} from "../../types";

@Component({
  selector: 'app-hotspot-create-dialog',
  templateUrl: './hotspot-modify-dialog.component.html',
  styleUrls: ['./hotspot-modify-dialog.component.css']
})
export class HotspotModifyDialogComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() hotspot: Hotspot;
  @Input() poly;
  form: FormGroup;
  selectedSound = null;
  name = '';
  error = '';
  svgPath: number[];
  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private modeService: ModeService,
    private dialogRef: MatDialogRef<HotspotModifyDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      soundSelected: '',
      name: this.hotspot.name,
      color: this.hotspot.strokeColor
    });
  }

  onSoundSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedSound = reader.result;
    };

    reader.onerror = (error) => {
     console.log('Error: ', error);
    };
    this.error = '';
  }


  submit(form) {
    this.hotspot.strokeColor = `${form.value.color}`;
    this.hotspot.name = `${form.value.name}`;
    this.modeService.currentDrawingTool = '';
    if(this.selectedSound!=='' && this.selectedSound!==null){
      this.hotspot.base64sound = this.selectedSound;
    }
    this.scenesService.updateScenes();
    this.dialogRef.close();
  }
}
