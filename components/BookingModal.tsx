import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSimplyBookLoaded, setIsSimplyBookLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !isSimplyBookLoaded) {
      // SimplyBook.me 스크립트 로드
      const script = document.createElement('script');
      script.src = '//widget.simplybook.net/v2/widget/widget.js';
      script.type = 'text/javascript';
      script.onload = () => {
        // SimplyBook.me 위젯 초기화
        if (window.SimplybookWidget) {
          new window.SimplybookWidget({
            "widget_type": "button",
            "url": "https://emotionalstudios.simplybook.net",
            "theme": "concise",
            "theme_settings": {
              "timeline_hide_unavailable": "1",
              "hide_past_days": "0",
              "timeline_show_end_time": "0",
              "timeline_modern_display": "as_slots",
              "light_font_color": "#ffffff",
              "sb_secondary_base": "#111111",
              "sb_base_color": "#ff6100",
              "display_item_mode": "block",
              "booking_nav_bg_color": "#ffffff",
              "sb_review_image": "1",
              "sb_review_image_preview": "/uploads/emotionalstudios/image_files/preview/5f40b1513e7cf31e3115abd5fcb117a8.jpg",
              "dark_font_color": "#111111",
              "btn_color_1": "#ff6100",
              "sb_company_label_color": "#ff6100",
              "hide_img_mode": "0",
              "show_sidebar": "1",
              "sb_busy": "#c7b3b3",
              "sb_available": "#ff6100"
            },
            "timeline": "modern",
            "datepicker": "inline_datepicker",
            "is_rtl": false,
            "app_config": {
              "clear_session": 0,
              "allow_switch_to_ada": 0,
              "predefined": []
            },
            "button_title": "Book now",
            "button_background_color": "#ff6100",
            "button_text_color": "#ffffff",
            "button_position": "right",
            "button_position_offset": "55%"
          });
          setIsSimplyBookLoaded(true);
        }
      };
      document.head.appendChild(script);

      return () => {
        // 컴포넌트 언마운트 시 스크립트 제거
        const existingScript = document.querySelector('script[src="//widget.simplybook.net/v2/widget/widget.js"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [isOpen, isSimplyBookLoaded]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Book Your Session</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* SimplyBook.me 위젯 컨테이너 */}
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Select Your Preferred Date & Time
              </h3>
              <p className="text-gray-600">
                Choose from available slots and complete your booking
              </p>
            </div>
            
            {/* SimplyBook.me 위젯이 여기에 렌더링됩니다 */}
            <div id="sb-widget-container" className="min-h-[500px]">
              {!isSimplyBookLoaded && (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-gray-600">Loading booking system...</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// SimplyBook.me 위젯 타입 정의
declare global {
  interface Window {
    SimplybookWidget: new (config: any) => any;
  }
}

export default BookingModal;