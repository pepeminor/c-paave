const KeyIntentConstants = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  TOKEN_ID: 'TOKEN_ID',
  TOKEN_KEY: 'TOKEN_KEY',
  /*
  Thực hiện chọn xác thực loại giấy tờ để bắt đầu.
     IDENTITY_CARD(1),
     PASSPORT(2),
     MILITARY_CARD(3),
     DRIVER_LICENSE(4);
   */
  DOCUMENT_TYPE: 'DOCUMENT_TYPE',
  /*
   Hiển thị màn hình chọn loại giấy tờ hay không. (Mặc định là false, Nếu cờ này là true thì không cần truyền vào DOCUMENT_TYPE ).
   */
  SELECT_DOCUMENT: 'SELECT_DOCUMENT',
  /* Lựa chọn phiên bản tiêu chuẩn hoặc nâng cao. (Khác nhau ở bước chụp chân dung. Phiên bản nâng cao sẽ có chống fake khuôn mặt 3D)
      STANDARD =  0,
      ADVANCED =  1
  * */
  VERSION_SDK: 'VERSION_SDK',
  SHOW_RESULT: 'SHOW_RESULT', //Có hiển thị màn hình kết quả của Vnpt hay không. (Mặc định là không)
  SHOW_DIALOG_SUPPORT: 'SHOW_DIALOG_SUPPORT', //Có hiển thị dialog hướng dẫn sử dụng hay không. (Mặc định là có)
  /*
   Camera mặc định tại bước chụp chân dung. (Mặc định là camera trước).
   FRONT = 0,
   BACK = 1;
   */
  CAMERA_FOR_PORTRAIT: 'CAMERA_FOR_PORTRAIT',
  SHOW_SWITCH: 'SHOW_SWITCH', //Có hiển thị nút chuyển camera trước sau tại màn hình chụp chân dung hay không (Mặc định là không)
  LIVENESS_STANDARD: 'LIVENESS_STANDARD', // LIVENESS_ADVANCED: Chống fake khi chụp ảnh chân dung. Khi chọn bản cơ bản thì config key liveness_standard, khi chọn nâng cao thì config key liveness_advanced tương ứng. (Mặc định là không)
  CALL_ADD_FACE: 'CALL_ADD_FACE', //Có gọi thực hiện add dữ liệu khuôn mặt và thông tin người dùng vào database hay không. (Mặc định là không)
  CHECK_MASKED_FACE: 'CHECK_MASKED_FACE', // Có thực hiện kiểm tra che mặt hay không.(có là true, không là false);
  CHECK_LIVENESS_CARD: 'CHECK_LIVENESS_CARD', //Có thực hiện kiểm tra giấy tờ thật giả hay không
  GUIDE_CARD_ID: 'GUIDE_CARD_ID', // tên ảnh dialog hướng dẫn chứng minh thư/ thẻ căn cước. (có thể thay đổi tên ảnh)
  GUIDE_PASSPORT: 'GUIDE_PASSPORT', // tên ảnh dialog hướng dẫn passport. (có thể thay đổi tên ảnh)
  GUIDE_MILITARY_ID: 'GUIDE_MILITARY_ID', // tên ảnh dialog hướng dẫn chứng minh thư quân đội. (có thể thay đổi tên ảnh)
  GUIDE_LICENSE: 'GUIDE_LICENSE', //tên ảnh dialog hướng dẫn bằng lái xe. (có thể thay đổi tên ảnh)
  GUIDE_PORTRAIT_BASIC: 'GUIDE_PORTRAIT_BASIC', //tên ảnh dialog hướng dẫn chụp khuôn mặt bản cơ bản. (có thể thay đổi tên ảnh)
  GUIDE_PORTRAIT_PRO: 'GUIDE_PORTRAIT_PRO', // tên ảnh dialog hướng dẫn chụp khuôn mặt bản nâng cao. (có thể thay đổi tên ảnh)
  IS_SHOW_HELP: 'IS_SHOW_HELP', // true/false
  LANGUAGE: 'LANGUAGE', //cài đặt ngôn ngữ dùng trong sdk.

  CHANGE_THEME: 'CHANGE_THEME', //Có cho phép tùy biến thay đổi thiết kế nhận diện thương hiệu (màu sắc, dialog hướng dẫn, logo) hay không. (có là true, không là false).
  /*
    Thay đổi logo mặc định
     Với andorid :
       + Tạo thư mục "assets" trong project theo đường dẫn ../appname/android/app/src/main/assets
       + Thêm file image vào trong thư mục assets VD logo.png
   */
  LOGO: 'LOGO',
  WIDTH_LOGO: 'WIDTH_LOGO',
  HEIGHT_LOGO: 'HEIGHT_LOGO',
  CHANGE_COLOR: 'CHANGE_COLOR', //màu của button
  CHANGE_TEXT_COLOR: 'CHANGE_TEXT_COLOR', //màu của chữ
};

const KeyResultConstants = {
  INFO_RESULT: '', // chuỗi json thông tin giấy tờ sau khi bóc tách. Trường hợp nếu ảnh giấy tờ bị mờ nhòe, thiếu số hoặc mất góc, trong chuỗi json mà service trả về sẽ xuất hiện trường thông tin cảnh báo với tên key là “warning_msg” thuộc key “object” với các giá trị có thể là : “Giấy tờ bị mất góc”, “Giấy tờ bị mờ/nhòe”.
  COMPARE_RESULT: '', // chuỗi json thông tin so sánh khuôn mặt trên giấy tờ và ảnh chụp chân dung.
  LIVENESS_RESULT: '', // chuỗi json thông tin ảnh chụp chân dung là thật hay fake.
  REGISTER_RESULT: '', // chuỗi json thông tin trả về sau khi thực hiện ADD_FACE
  LIVENESS_CARD_FRONT_RESULT: '', // chuỗi json thông tin trả về check thật giả với giấy tờ mặt trước
  LIVENESS_CARD_REAR_RESULT: '', // chuỗi json thông tin trả về check thật giả với giấy tờ mặt sau
  MASKED_FACE_RESULT: '', // chuỗi json thông tin trả về khi thực hiện check khuôn mặt chân dung có che mặt hay không
  FRONT_IMAGE: '', //ảnh mặt trước giấy tờ.
  REAR_IMAGE: '', // ảnh mặt sau giấy tờ.
  PORTRAIT_IMAGE: '', // ảnh chân dung.
  ORIGIN_LOCATION_RESULT: '', //chuỗi json thông tin trả về kết quả mapping address của trường ORIGIN_LOCATION.
  RECENT_LOCATION_RESULT: '', // chuỗi json thông tin trả kết quả mapping address của RECENT_LOCATION.
  ISSUE_PLACE_RESULT: '', // chuỗi json thông tin trả kết quả mapping address của ISSUE_PLACE_RESULT.
  BIRTH_PLACE_RESULT: '', //chuỗi json thông tin trả kết quả mapping address của BIRTH_PLACE_RESULT.
};

export type IVNPTEKYCResultAndroidRaw = {
  BIRTH_PLACE_RESULT: any;
  COMPARE_RESULT: string; //json string
  FRONT_IMAGE: string;
  INFO_RESULT: string; //json string
  ISSUE_PLACE_RESULT: any;
  LIVENESS_CARD_FRONT_RESULT: string;
  LIVENESS_CARD_REAR_RESULT: string;
  LIVENESS_RESULT: string;
  MASKED_FACE_RESULT: string;
  ORIGIN_LOCATION_RESULT: any;
  PORTRAIT_IMAGE: string | null;
  PORTRAIT_NEAR_IMAGE: string | null;
  PORTRAIT_FAR_IMAGE: string | null;
  REAR_IMAGE: string;
  REGISTER_RESULT: string;
  RECENT_LOCATION_RESULT: any;
  QR_CODE_RESULT: string;
};

export type IVNPTEKYCResultAndroidConverted = {
  QR_CODE_RESULT: string;
  BIRTH_PLACE_RESULT: any;
  COMPARE_RESULT: {
    imgs: {
      img_face: string;
      img_front: string;
    };
    object: {
      result: string; //'Khuôn mặt không khớp'
      msg: string;
      prob: number;
      match_warning: string;
      multiple_faces: boolean;
    };
    dataSign: string;
    dataBase64: string;
    logID: string;
    message: string;
    server_version: string;
    statusCode: number;
    challengeCode: string;
  };
  FRONT_IMAGE: string;
  INFO_RESULT: {
    imgs: {
      img_back: string;
      img_front: string;
    };
    dataSign: string;
    dataBase64: string;
    logID: string;
    server_version: string;
    message: string;
    challengeCode: string;
    statusCode: number;
    object: {
      post_code: {
        city: (number | string)[]; //'['46', 'Tỉnh Thừa Thiên Huế', 1]'
        debug: string;
        detail: string;
        district: (number | string)[]; // '['477', 'Huyện Quảng Điền', 1]'
        type: string; //'hometowm'
        ward: (number | string)[]; // '['19870', 'Xã Quảng Thái', 1]'
      }[];
      msg: string;
      name_prob: number;
      origin_location: string; // Quê quán (Place of origin)
      gender: string;
      expire_warning: string;
      cover_prob_front: number;
      back_type_id: number;
      valid_date_prob: number;
      origin_location_prob: number;
      nation_policy: string; //'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'
      corner_warning: string;
      features: string; //'Nốt ruồi C:1,5 cm dưới sau mép phải'
      valid_date: string; // 'dd/MM/yyyy' (có giá trị đến)
      dupplication_warning: boolean;
      issue_date: string; //'dd/MM/yyyy' (ngày cấp)
      id_fake_prob: number;
      back_corner_warning: string;
      mrz_prob: number;
      back_expire_warning: string;
      id: string; // số cmnd, cccd
      citizen_id_prob: number;
      id_probs: number[];
      msg_back: string;
      features_prob: number;
      birth_day_prob: number;
      issue_place: string; //nơi cấp
      id_fake_warning: string;
      recent_location: string; // 'Thôn Bình Hoà 4A\nBình Thuận, Thị Xã Buôn Hồ, Đắk Lắk'
      type_id: number;
      card_type: string; //'CĂN CƯỚC CÔNG DÂN'
      birth_day: string; //'dd/MM/yyyy'
      issue_date_prob: number;
      citizen_id: string;
      recent_location_prob: number;
      issue_place_prob: number;
      nationality: string;
      name: string; //'PHAN TRỌNG NHÂN'
      issue_date_probs: number[];
      checking_result_back: {
        corner_cut_result: number;
        edited_prob: number;
        recaptured_result: number;
        check_photocopied_prob: number;
        corner_cut_prob: number[];
        check_photocopied_result: number;
        edited_result: number;
        recaptured_prob: number;
      };
      general_warning: any[];
      quality_back: {
        blur_score: number;
        luminance_score: number;
        bright_spot_score: number;
        bright_spot_param: {
          bright_spot_threshold: number;
          average_intensity: number;
          total_bright_spot_area: number;
        };
        final_result: {
          bad_luminance_likelihood: string;
          low_resolution_likelihood: string;
          blurred_likelihood: string;
          bright_spot_likelihood: string;
        };
        resolution: number[];
      };
      checking_result_front: {
        corner_cut_result: number;
        edited_prob: number;
        recaptured_result: number;
        check_photocopied_prob: number;
        check_photocopied_result: number;
        edited_result: number;
        recaptured_prob: number;
        corner_cut_prob: number[];
      };
      name_probs: number[];
      mrz_probs: number[];
      quality_front: {
        blur_score: number;
        luminance_score: number;
        bright_spot_score: number;
        resolution: number[];
        final_result: {
          bad_luminance_likelihood: string;
          low_resolution_likelihood: string;
          blurred_likelihood: string;
          bright_spot_likelihood: string;
        };
        bright_spot_param: {
          bright_spot_threshold: number;
          average_intensity: number;
          total_bright_spot_area: number;
        };
      };
      match_front_back: {
        match_bod: string; //'yes'/'no'
        match_id: string; //'yes'/'no'
        match_name: string; //'yes'/'no'
        match_sex: string; //'yes'/'no'
        match_valid_date: string; //'yes'/'no'
      };
    };
  };
  ISSUE_PLACE_RESULT: any;
  LIVENESS_CARD_FRONT_RESULT: string;
  LIVENESS_CARD_REAR_RESULT: string;
  LIVENESS_RESULT: string;
  MASKED_FACE_RESULT: string;
  ORIGIN_LOCATION_RESULT: any;
  PORTRAIT_IMAGE: string | null;
  PORTRAIT_NEAR_IMAGE: string | null;
  PORTRAIT_FAR_IMAGE: string | null;
  REAR_IMAGE: string;
  REGISTER_RESULT: string;
  RECENT_LOCATION_RESULT: any;
};

export type IVNPTEKYCResultIOS = {
  COMPARE_RESULT: {
    challengeCode: string;
    dataBase64: string;
    dataSign: string;
    imgs: {
      img_face: string;
      img_front: string;
    };
    logID: string;
    message: string;
    object: {
      match_warning: string;
      msg: string;
      multiple_faces: boolean;
      prob: number;
      result: string; //'Khuôn mặt không khớp'
    };
    server_version: string;
    statusCode: number;
  };
  FRONT_IMAGE: string;
  INFO_RESULT: {
    challengeCode: string;
    dataBase64: string;
    dataSign: string;
    imgs: {
      img_face: string;
      img_front: string;
    };
    logID: string;
    message: string;
    object: {
      back_corner_warning: string;
      back_expire_warning: string;
      back_type_id: number;
      birth_day: string; //'dd/MM/yyyy'
      birth_day_prob: number;
      card_type: string; //'CĂN CƯỚC CÔNG DÂN'
      checking_result_back: {
        check_photocopied_prob: number;
        check_photocopied_result: string;
        corner_cut_prob: number[];
        corner_cut_result: string;
        edited_prob: number;
        edited_result: string;
        recaptured_prob: number;
        recaptured_result: string;
      };
      checking_result_front: {
        check_photocopied_prob: number;
        check_photocopied_result: string;
        corner_cut_prob: number[];
        corner_cut_result: string;
        edited_prob: number;
        edited_result: string;
        recaptured_prob: number;
        recaptured_result: string;
      };
      citizen_id: string;
      citizen_id_prob: number;
      corner_warning: string;
      cover_prob_front: number;
      dupplication_warning: boolean;
      expire_warning: string;
      features: string; //'Nốt ruồi C:1,5 cm dưới sau mép phải'
      features_prob: number;
      gender: string;
      general_warning: any[];
      id: string; // số cmnd, cccd
      id_fake_prob: number;
      id_fake_warning: string;
      id_probs: string;
      issue_date: string; //'dd/MM/yyyy' (ngày cấp)
      issue_date_prob: number;
      issue_date_probs: number[];
      issue_place: string; //nơi cấp
      issue_place_prob: number;
      match_front_back: {
        match_bod: string; //'yes'/'no'
        match_id: string; //'yes'/'no'
        match_name: string; //'yes'/'no'
        match_sex: string; //'yes'/'no'
        match_valid_date: string; //'yes'/'no'
      };
      mrz: string[];
      mrz_prob: number;
      mrz_probs: number[];
      msg: string;
      msg_back: string;
      name: string; //'PHAN TRỌNG NHÂN'
      name_prob: number;
      name_probs: number[];
      nation_policy: string; //'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'
      nationality: string; // 'Việt Nam'
      origin_location: string; // Quê quán (Place of origin)
      origin_location_prob: number;
      post_code: {
        city: (number | string)[]; //'['46', 'Tỉnh Thừa Thiên Huế', 1]'
        debug: string;
        detail: string;
        district: (number | string)[]; // '['477', 'Huyện Quảng Điền', 1]'
        type: string; //'hometowm'
        ward: (number | string)[]; // '['19870', 'Xã Quảng Thái', 1]'
      }[];
      quality_back: {
        blur_score: number;
        bright_spot_param: {
          average_intensity: number;
          bright_spot_threshold: number;
          total_bright_spot_area: number;
        };
        bright_spot_score: number;
        final_result: {
          bad_luminance_likelihood: string;
          blurred_likelihood: string;
          bright_spot_likelihood: string;
          low_resolution_likelihood: string;
        };
        luminance_score: number;
        resolution: number[];
      };
      quality_front: {
        blur_score: number;
        bright_spot_param: {
          average_intensity: number;
          bright_spot_threshold: number;
          total_bright_spot_area: number;
        };
        bright_spot_score: number;
        final_result: {
          bad_luminance_likelihood: string;
          blurred_likelihood: string;
          bright_spot_likelihood: string;
          low_resolution_likelihood: string;
        };
        luminance_score: number;
        resolution: number[];
      };
      recent_location: string; // 'Thôn Bình Hoà 4A\nBình Thuận, Thị Xã Buôn Hồ, Đắk Lắk'
      recent_location_prob: number;
      tampering: {
        is_legal: string;
        warning: any[];
      };
      type_id: number;
      valid_date: string; // 'dd/MM/yyyy' (có giá trị đến)
      valid_date_prob: number;
    };
    server_version: string;
    statusCode: number;
  };
  LIVENESS_CARD_FRONT_RESULT: {
    challengeCode: string;
    dataBase64: string;
    dataSign: string;
    imgs: {
      img: string;
    };
    logID: string;
    message: string;
    object: {
      face_swapping: boolean;
      face_swapping_prob: number;
      fake_liveness: boolean;
      fake_liveness_prob: number;
      fake_print_photo: boolean;
      fake_print_photo_prob: number;
      liveness: string; // 'success'
      liveness_msg: string; // 'Giấy tờ thật'
    };
    server_version: string;
    statusCode: number;
  };
  MASKED_FACE_RESULT: {};
  REGISTER_RESULT: {};
  PORTRAIT_IMAGE: string;
  REAR_IMAGE: string;
  LIVENESS_RESULT: {
    challengeCode: string;
    dataBase64: string;
    dataSign: string;
    imgs: {
      far_img: string;
      near_img: string;
    };
    logID: string;
    message: string;
    object: {
      age: number;
      blur_face: string;
      blur_face_score: number;
      is_eye_open: string;
      liveness: string;
      liveness_msg: string;
      liveness_prob: number;
    };
    server_version: string;
    statusCode: number;
  };
  QR_CODE_RESULT: string;
};

export { KeyIntentConstants, KeyResultConstants };
