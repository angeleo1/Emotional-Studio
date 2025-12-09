import React, { useEffect } from 'react';

declare global {
  interface Window {
    SimplybookWidget: any;
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.SimplybookWidget) {
      new window.SimplybookWidget({
        widget_type: "button",
        url: "https://emotionalstudios.simplybook.net",
        theme: "default",
        theme_settings: {
          timeline_hide_unavailable: "1",
          hide_past_days: "0",
          timeline_show_end_time: "0",
          timeline_modern_display: "as_slots",
          sb_base_color: "#ee9cab",
          display_item_mode: "list",
          booking_nav_bg_color: "#ee9cab",
          body_bg_color: "#f9f9f9",
          sb_review_image: "64",
          sb_review_image_preview: "/uploads/emotionalstudios/image_files/preview/4d46b939a4eaa4ad6c437c1e0c138ec1.png",
          dark_font_color: "#3a4445",
          light_font_color: "#ffffff",
          btn_color_1: "#d8aeab",
          sb_company_label_color: "#3a4445",
          hide_img_mode: "1",
          show_sidebar: "1",
          sb_busy: "#c7b3b3",
          sb_available: "#ebddde"
        },
        timeline: "modern",
        datepicker: "top_calendar",
        is_rtl: false,
        app_config: {
          clear_session: 0,
          allow_switch_to_ada: 0,
          predefined: {
            provider: "2",
            category: "1"
          }
        }
      });
      onClose();
    }
  }, [isOpen, onClose]);

  return null;
};
