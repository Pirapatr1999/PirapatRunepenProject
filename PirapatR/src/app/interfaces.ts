  export interface AttachFile {
  id: string;
  seq: number;
  refer_id: string;
  picture_main_file_name: string;
  picture_main_file_url: string;
  file_name: string;
  file_name_original: string;
  file_url: string;
  detail: string;
  level_type: string;
  attach_type: string;
  checksum: string;
  collective_type: string;
  /**
   * isProcess = N When [ isCreated = N, isUpdated = N, isDeleted = N ] Only
   */
  is_process: string;
  is_created: string;
  is_updated: string;
  is_deleted: string;

  is_uploading: boolean;
  is_show_upload_message: boolean;
  upload_message: string;
  upload_status: 'success' | 'fail' | '';
}


  export interface QcInspection {

    qc_inspection_id: string;
    topic_name: string;
    seq: number;
    is_created: string;
    is_updated: string;
    is_deleted: string;
    product_status_qc_check_sheet: string;
    attach_references: AttachFile[];
    inspections: Inspection[];
  }
  export interface Inspection {

    qc_inspection_id: string;
    qc_inspection_detail_id: string;
    topic_name: string;
    form_type: string;
    answer: string;
    is_created: string;
    is_updated: string;
    is_deleted: string;
    seq: number;
    choices: InspectionChoice[];
    attach_guide_pictures: InspectionAttachGuidePicture[];
  }

  export interface InspectionChoice {

    qc_inspection_id: string;
    qc_inspection_detail_id: string;
    seq: number;
    choice_id: string;
    detail: string;
    is_created: string;
    is_updated: string;
    is_deleted: string;
  }

  export interface InspectionAttachGuidePicture {

    qc_inspection_id: string;
    qc_inspection_detail_id: string;
    attach_id: string;
    main_file_name: string;
    main_file_url: string;
    file_name: string;
    file_url: string;
    detail: string;
    is_created: string;
    is_updated: string;
    is_deleted: string;
  }

