import { useEffect } from 'react';

declare global {
  interface Window {
    SimplybookWidget: any;
    sbWidget: any;
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  // Load SimplyBook.me widget script on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.SimplybookWidget) {
      const script = document.createElement('script');
      script.src = '//simplybook.me/v2/widget/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Open widget when isOpen becomes true
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Initialize widget if not already
      if (!window.sbWidget && window.SimplybookWidget) {
        window.sbWidget = new window.SimplybookWidget({
          widget_type: 'iframe',
          url: 'https://emotionalstudios.simplybook.me',
          theme: 'minimal',
          theme_settings: {
            timeline_show_end_time: '0',
            timeline_modern_display: 'as_slots',
            sb_base_color: '#000000',
            display_item_mode: 'block',
            body_bg_color: '#ffffff',
            sb_review_image: '',
            dark_font_color: '#000000',
            light_font_color: '#ffffff',
            sb_company_label_color: '#000000',
            hide_img_mode: '0',
            sb_busy: '#dad2ce',
            sb_available: '#d3e0f1'
          },
          timeline: 'modern',
          datepicker: 'top_calendar',
          is_rtl: false,
          app_config: {
            allow_switch_to_ada: 0,
            predefined: {}
          }
        });
      }
      
      // Open the widget
      if (window.sbWidget) {
        window.sbWidget.open();
      } else if (window.SimplybookWidget) {
        // Fallback: create and open immediately
        new window.SimplybookWidget({
          widget_type: 'iframe',
          url: 'https://emotionalstudios.simplybook.me',
          theme: 'minimal',
        });
      }
      
      // Close modal state
      onClose();
    }
  }, [isOpen, onClose]);

  return null;
};
