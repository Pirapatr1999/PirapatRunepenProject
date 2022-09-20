import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, FormArray, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";
import {BsModalService} from "ngx-bootstrap/modal";
import {AttachFile, Inspection, QcInspection} from "../interfaces";
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  modeAdd = true;
  isCheckPassLimitFile = true;
  fileName = '';
  detailReferences = '';

  form: FormGroup;


  productsTypeList = [
    {type_id: 'Toilet-type-t1' , type_code: 'Toilet-type-t1', detail: 'Toilet-type-t1' },
    {type_id: 'Toilet-type-t2' , type_code: 'Toilet-type-t2', detail: 'Toilet-type-t2' },
    {type_id: 'Toilet-type-t3' , type_code: 'Toilet-type-t3', detail: 'Toilet-type-t3' },
    {type_id: 'Toilet-type-t4' , type_code: 'Toilet-type-t4', detail: 'Toilet-type-t4' },
    {type_id: 'Toilet-type-t5' , type_code: 'Toilet-type-t5', detail: 'Toilet-type-t5' },
  ]
  private numQC: number;
  private numInspec: number;


  constructor(private fb: FormBuilder,
              private sanitizer: DomSanitizer,
              private router: Router,
              private modalService: BsModalService,
              private changeDetectorRef: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    console.log(this.modeAdd);

    this.form = this.fb.group({
      product_id: [''],
      product_code: [''],
      product_name: ['', Validators.required],
      product_type_id: ['', Validators.required],
      attach_modular_drawings: this.fb.array([]),
      attach_modular_drawings_for_remove: this.fb.array([]),
      qc_inspections: this.fb.array([]),
      qc_inspections_for_remove: this.fb.array([]),
    });
  }
  // GET
  get modularDrawings(): FormArray {
    return this.form.get('attach_modular_drawings') as FormArray;
  }
  // get qc-inspection attach references from array
  getQcInspectionAttachReferences(qcInspectionIndex: number): FormArray {
    return this.qcInspections.at(qcInspectionIndex).get('attach_references') as FormArray;
  }
  // get qc-inspections no () from array
  get qcInspections(): FormArray {
    return this.getQcInspections();
  }

  // get qc-inspections from array
  getQcInspections(): FormArray {
    return this.form.get('qc_inspections') as FormArray;
  }

  // get qc-inspection attach references from object
  getQcInspectionAttachReference(qcInspectionIndex: number, attachReferenceIndex: number): AbstractControl {
    return this.getQcInspectionAttachReferences(qcInspectionIndex).at(attachReferenceIndex) as AbstractControl;
  }

  // Add
  addModularDrawing(): void {
    this.addModularDrawingToFormGroup({
      id: '',
      // seq: this.modeAdd ? 1 : this.modularDrawings.length + 1,
      // refer_id: this.modeAdd ? '' : this.productId,
      picture_main_file_name: '',
      picture_main_file_url: '',
      file_name: '',
      file_name_original: '',
      file_url: '',
      detail: '',
      level_type: 'PRODUCT_MODULE_DRAWING',
      attach_type: 'FILE',
      checksum: '',
      collective_type: '',
      is_process: 'Y',
      is_created: 'Y',
      is_updated: 'N',
      is_deleted: 'N',
      is_uploading: false,
      is_show_upload_message: false,
      upload_message: '',
      upload_status: '',
    } as AttachFile);
  }

  addModularDrawingToFormGroup(attachFile: AttachFile): void {
    const dataModular = this.qcInspectionAttachReferencesFormGroup(attachFile);
    this.modularDrawings.push(dataModular);
  }
  qcInspectionAttachReferencesFormGroup(attachFile: AttachFile): FormGroup {

    console.log('qcInspectionAttachReferencesFormGroup: ', attachFile);

    return this.fb.group({
      id: [attachFile.id],
      seq: [attachFile.seq],
      refer_id: [attachFile.refer_id],
      picture_main_file_name: [attachFile.picture_main_file_name],
      picture_main_file_url: [attachFile.picture_main_file_url],
      file_name: [attachFile.file_name],
      file_name_original: [attachFile.file_name_original],
      file_url: [attachFile.file_url],
      detail: [attachFile.detail],
      level_type: [attachFile.level_type],
      attach_type: [attachFile.attach_type],
      checksum: [''],
      collective_type: [''],
      is_process: [attachFile.is_process],
      is_created: [attachFile.is_created],
      is_updated: [attachFile.is_updated],
      is_deleted: [attachFile.is_deleted],
      is_uploading: [attachFile.is_uploading || false],
      is_show_upload_message: [attachFile.is_show_upload_message || false],
      upload_message: [attachFile.upload_message || ''],
      upload_status: [attachFile.upload_status || ''],
    });
  }

  fileSizeLimit(file: File): boolean {

    // 512000 Bytes (B)   = 500 Kilobytes (KB)    = 0.5 Megabytes (MB)
    // 1024000 Bytes (B)  = 1024 Kilobytes (KB)   = 1 Megabytes (MB)
    // 10485760 Bytes (B) = 10240 Kilobytes (KB)  = 10 Megabytes (MB)
    // 15728640 Bytes (B) = 15360 Kilobytes (KB)  = 15 Megabytes (MB)
    // 20971520 Bytes (B) = 20480 Kilobytes (KB)  = 20 Megabytes (MB)

    if (file.size > 10485760) {
      alert('File has exceeded 10 MB');
      this.isCheckPassLimitFile = false;
    } else {
      this.isCheckPassLimitFile = true;
    }
    return this.isCheckPassLimitFile;
  }

  failFeedBack(fieldName: string,
               qcInspectionIndex: number,
               inspectionIndex: number,
               modularDrawingIndex: number,
               attachReferenceIndex: number) {

    const uploadMessage = 'File upload failed';
    const uploadStatus = 'fail';

    if ('attach_modular_drawings' === fieldName) {

      this.modularDrawings.at(modularDrawingIndex).patchValue({
        is_show_upload_message: true,
        upload_message: uploadMessage,
        upload_status: uploadStatus,
      });

    }

    if ('attach_references' === fieldName) {

      this.getQcInspectionAttachReference(qcInspectionIndex, attachReferenceIndex)
        .patchValue({
          is_show_upload_message: true,
          upload_message: uploadMessage,
          upload_status: uploadStatus,
        });
    }

    this.dismissMessage(fieldName, qcInspectionIndex, inspectionIndex, modularDrawingIndex, attachReferenceIndex);
  }

  dismissMessage(fieldName: string,
                 qcInspectionIndex: number,
                 inspectionIndex: number,
                 modularDrawingIndex: number,
                 attachReferenceIndex: number): void {

    const uploadMessage = '';
    const uploadStatus = '';

    setTimeout(() => {
      if ('attach_modular_drawings' === fieldName) {
        this.modularDrawings.at(modularDrawingIndex)
          .patchValue({
            is_show_upload_message: false,
            upload_message: uploadMessage,
            upload_status: uploadStatus,
          });
        this.changeDetectorRef.detectChanges();
      }
    }, 3000);
  }

  qcInspectionBodyForAddMore(): QcInspection {
    return {
      qc_inspection_id: '',
      topic_name: '',
      seq: 1,
      is_created: 'Y',
      is_updated: 'N',
      is_deleted: 'N',
      product_status_qc_check_sheet: '',
      attach_references: [
        {
          id: '',
          seq: 1,
          refer_id: '',
          picture_main_file_name: '',
          picture_main_file_url: '',
          file_name: '',
          file_name_original: '',
          file_url: '',
          detail: '',
          level_type: 'PRODUCT_QC_INSPECTION_REFERENCE',
          attach_type: 'PICTURE_MAIN',
          checksum: '',
          collective_type: '',
          is_process: 'Y',
          is_created: 'Y',
          is_updated: 'N',
          is_deleted: 'N',
          is_uploading: false,
          is_show_upload_message: false,
          upload_message: '',
          upload_status: '',
        }
      ],
      inspections: [
        {
          qc_inspection_id: '',
          qc_inspection_detail_id: '',
          topic_name: '',
          form_type: '',
          answer: '',
          is_created: 'Y',
          is_updated: 'N',
          is_deleted: 'N',
          seq: 1,
          choices: [],
          attach_guide_pictures: [
            {
              qc_inspection_id: '',
              qc_inspection_detail_id: '',
              attach_id: '',
              main_file_name: '',
              main_file_url: '',
              file_name: '',
              file_url: '',
              detail: '',
              is_created: 'Y',
              is_updated: 'N',
              is_deleted: 'N',
            }
          ],
        } as Inspection
      ],
    } as QcInspection;
  }


  addQCInspection(value: string): void {
    console.log(this.qcInspections.get('topic_name')?.value);
    console.log(this.getQcInspections().get('topic_name')?.value);

      if (value === 'Create') {

      const PushQC = [];
      this.getQcInspections().controls.forEach((val, index) => {
        if (val.value.is_created === 'Y') {
          PushQC.push(val);
        }
      });
      this.numQC = PushQC.length + 1;
      this.numInspec = PushQC.length + 1;

      const data = this.fb.group({
        qc_inspection_id: [''],
        qc_inspection_detail_id: [''],
        refer_id: [''],
        topic_name: [''],
        detail: [''],
        tapOpen: [''],
        is_created: ['Y'],
        is_updated: ['N'],
        is_deleted: ['N'],
        is_show: true,
        seq: [PushQC.length + 1],
        inspections: this.fb.array([
          this.fb.group({
            qc_inspection_id: [''],
            qc_inspection_detail_id: [''],
            seq: [1],
            topic_name: [''],
            form_type: [''],
            detail: [''],
            refer_id: [''],
            is_created: ['Y'],
            is_updated: ['N'],
            is_deleted: ['N'],
            is_show: true,
            choices: this.fb.array([]),
            attach_guide_pictures: this.fb.array([
              this.fb.group({
                main_file_name: [''],
                main_file_url: [''],
                file_name: [''],
                detail: [''],
                refer_id: [''],
                is_process: [''],
                is_created: ['Y'],
                is_updated: ['N'],
                is_deleted: ['N'],
                seq: [1]
              })

            ]),
          })
        ]),
        attach_references: this.fb.array([
          this.fb.group({
            picture_main_file_name: [''],
            picture_main_file_url: [''],
            id: [''],
            refer_id: [''],
            file_name: [''],
            file_url: [''],
            detail: this.detailReferences,
            fileRef: this.fileName,
            level_type: ['PRODUCT_QC_INSPECTION_REFERENCE'],
            attach_type: ['PICTURE_MAIN'],
            is_process: [''],
            is_created: ['Y'],
            is_updated: ['N'],
            is_deleted: ['N'],
            is_show: true,
            seq: [1],
          })
        ]),
      });
      this.getQcInspections().push(data);

    }



  }

  addQcInspectionToFormGroup(qcInspection: QcInspection): void {

    // qc-inspections
    const model = this.fb.group({
      qc_inspection_id: [qcInspection.qc_inspection_id],
      topic_name: [qcInspection.topic_name,],
      seq: [qcInspection.seq],
      is_created: [qcInspection.is_created],
      is_updated: [qcInspection.is_updated],
      is_deleted: [qcInspection.is_deleted],
      product_status_qc_check_sheet: [qcInspection.product_status_qc_check_sheet],
      attach_references: this.fb.array([]),
      inspections: this.fb.array([]),
    });

    qcInspection.attach_references
      .forEach((attachFile) => {
        (model.get('attach_references') as FormArray)
          .push(
            this.fb.group({
              id: [attachFile.id],
              seq: [attachFile.seq],
              refer_id: [attachFile.refer_id],
              picture_main_file_name: [attachFile.picture_main_file_name],
              picture_main_file_url: [attachFile.picture_main_file_url],
              file_name: [attachFile.file_name],
              file_name_original: [attachFile.file_name_original],
              file_url: [attachFile.file_url],
              detail: [attachFile.detail],
              level_type: [attachFile.level_type],
              attach_type: [attachFile.attach_type],
              checksum: [attachFile.checksum],
              collective_type: [attachFile.collective_type],
              is_process: [attachFile.is_process],
              is_created: [attachFile.is_created],
              is_updated: [attachFile.is_updated],
              is_deleted: [attachFile.is_deleted],
              is_uploading: [attachFile.is_uploading],
              is_show_upload_message: [attachFile.is_show_upload_message],
              upload_message: [attachFile.upload_message],
              upload_status: [attachFile.upload_status],
            })
          );
      });

    // add to qc-inspections
    this.getQcInspections().push(model);
  }


  removeModularDrawing(index: number): void {
    // if (this.modularDrawings.at(index).get('id').value !== '') {
    //   this.modularDrawings.at(index).get('is_process').setValue('Y');
    //   this.modularDrawings.at(index).get('is_created').setValue('N');
    //   this.modularDrawings.at(index).get('is_updated').setValue('N');
    //   this.modularDrawings.at(index).get('is_deleted').setValue('Y');
    //   this.modularDrawingsForRemove.push(this.modularDrawings.at(index));
    // }
    this.modularDrawings.removeAt(index);
  }

  removeQcInspection(index: number): void {
    // if (this.qcInspections.at(index).get('qc_inspection_id').value !== '') {
    //   this.qcInspections.at(index).get('is_created').setValue('N');
    //   this.qcInspections.at(index).get('is_updated').setValue('N');
    //   this.qcInspections.at(index).get('is_deleted').setValue('Y');
    //   this.qcInspectionsForRemove.push(this.qcInspections.at(index));
    // }
    this.qcInspections.removeAt(index);
  }

  removeQcInspectionAttachReference(qcInspectionIndex: number, attachReferenceIndex: number): void {
    const attach = this.getQcInspectionAttachReference(qcInspectionIndex, attachReferenceIndex);
    if (this.modeAdd) {
      attach.patchValue({
        file_name: '',
        file_name_original: '',
        file_url: '',
        is_process: 'Y',
        is_created: 'Y',
        is_updated: 'N',
        is_deleted: 'N',
      });
    } else if (!this.modeAdd) {
      attach.patchValue({
        file_name: '',
        file_name_original: '',
        file_url: '',
        is_process: 'Y',
        is_created: 'N',
        is_updated: 'Y',
        is_deleted: 'N',
      });
    }
  }


  backToMain(): void {
    this.router.navigate(['/product/']).then();
    // this.router.navigate(['/backoffice/product/${productId}']).then();
  }

}
