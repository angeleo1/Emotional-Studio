import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    SimplybookWidget: any;
  }
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen || !widgetRef.current) return;

    const loadWidget = () => {
      if (typeof window !== 'undefined' && window.SimplybookWidget && widgetRef.current) {
        try {
          // 기존 위젯이 있으면 제거
          if (widgetInstanceRef.current) {
            try {
              widgetInstanceRef.current.destroy?.();
            } catch (e) {
              // destroy 메서드가 없을 수 있음
            }
          }

          // 위젯 컨테이너 초기화
          if (widgetRef.current) {
            widgetRef.current.innerHTML = '';
          }

          // 새 위젯 생성
          widgetInstanceRef.current = new window.SimplybookWidget({
            "widget_type": "iframe",
            "url": "https://emotionalstudios.simplybook.net",
            "theme": "default",
            "theme_settings": {
              "timeline_hide_unavailable": "1",
              "hide_past_days": "0",
              "timeline_show_end_time": "0",
              "timeline_modern_display": "as_slots",
              "sb_base_color": "#ee9cab",
              "display_item_mode": "list",
              "booking_nav_bg_color": "#ee9cab",
              "body_bg_color": "#f9f9f9",
              "sb_review_image": "64",
              "sb_review_image_preview": "/uploads/emotionalstudios/image_files/preview/4d46b939a4eaa4ad6c437c1e0c138ec1.png",
              "dark_font_color": "#3a4445",
              "light_font_color": "#ffffff",
              "btn_color_1": "#d8aeab",
              "sb_company_label_color": "#3a4445",
              "hide_img_mode": "1",
              "show_sidebar": "1",
              "sb_busy": "#c7b3b3",
              "sb_available": "#ebddde"
            },
            "timeline": "modern",
            "datepicker": "top_calendar",
            "is_rtl": false,
            "app_config": {
              "clear_session": 0,
              "allow_switch_to_ada": 0,
              "predefined": {
                "provider": "2",
                "category": "1"
              }
            }
          });
        } catch (error) {
          console.error('SimplyBook 위젯 로드 중 오류:', error);
        }
      }
    };

    // 스크립트가 이미 로드되어 있는 경우
    if (window.SimplybookWidget) {
      loadWidget();
    } else {
      // 스크립트가 로드되지 않은 경우, 로드 후 실행
      const script = document.createElement('script');
      script.src = '//widget.simplybook.net/v2/widget/widget.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = loadWidget;
      script.onerror = () => {
        console.error('SimplyBook 위젯 스크립트 로드 실패');
      };
      document.head.appendChild(script);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (widgetInstanceRef.current) {
        try {
          widgetInstanceRef.current.destroy?.();
        } catch (e) {
          // destroy 메서드가 없을 수 있음
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 w-full h-full md:max-w-4xl md:h-[90vh] relative shadow-2xl flex flex-col rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
          <span className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Book Session</span>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-black dark:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* SimplyBook.me Widget */}
        <div className="flex-1 w-full bg-white dark:bg-zinc-900 relative overflow-hidden">
          <div 
            ref={widgetRef} 
            className="simplybook-iframe-widget w-full h-full"
            style={{ 
              minHeight: '100%',
              width: '100%'
            }}
          />
        </div>
      </div>
    </div>
  );
};
