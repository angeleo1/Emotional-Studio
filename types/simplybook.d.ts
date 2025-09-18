declare global {
  interface Window {
    SimplybookWidget: new (config: SimplyBookWidgetConfig) => SimplyBookWidgetInstance;
  }
}

export interface SimplyBookWidgetConfig {
  widget_type: string;
  url: string;
  theme: string;
  theme_settings: {
    timeline_hide_unavailable: string;
    hide_past_days: string;
    timeline_show_end_time: string;
    timeline_modern_display: string;
    light_font_color: string;
    sb_secondary_base: string;
    sb_base_color: string;
    display_item_mode: string;
    booking_nav_bg_color: string;
    sb_review_image: string;
    sb_review_image_preview: string;
    dark_font_color: string;
    btn_color_1: string;
    sb_company_label_color: string;
    hide_img_mode: string;
    show_sidebar: string;
    sb_busy: string;
    sb_available: string;
  };
  timeline: string;
  datepicker: string;
  is_rtl: boolean;
  app_config: {
    clear_session: number;
    allow_switch_to_ada: number;
    predefined: any[];
  };
  button_title: string;
  button_background_color: string;
  button_text_color: string;
  button_position: string;
  button_position_offset: string;
}

export interface SimplyBookWidgetInstance {
  // SimplyBook 위젯 인스턴스의 메서드들이 필요하면 여기에 추가
  destroy?: () => void;
  refresh?: () => void;
}

export {};
