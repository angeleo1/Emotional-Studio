import { useEffect, useRef } from 'react';

interface SimplyBookIframeProps {
  className?: string;
}

declare global {
  interface Window {
    SimplybookWidget: any;
  }
}

export default function SimplyBookIframe({ className = '' }: SimplyBookIframeProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SimplyBook 위젯 스크립트가 로드되었는지 확인
    const loadWidget = () => {
      if (typeof window !== 'undefined' && window.SimplybookWidget && widgetRef.current) {
        try {
          const widget = new window.SimplybookWidget({
            "widget_type": "iframe",
            "url": "https://emotionalstudios.simplybook.net",
            "theme": "default",
            "theme_settings": {
              "timeline_hide_unavailable": "1",
              "hide_past_days": "0",
              "timeline_show_end_time": "0",
              "timeline_modern_display": "as_slots",
              "sb_base_color": "#ff6100",
              "display_item_mode": "block",
              "booking_nav_bg_color": "#ff6100",
              "body_bg_color": "#f2f2f2",
              "sb_review_image": "",
              "dark_font_color": "#474747",
              "light_font_color": "#f5fcff",
              "btn_color_1": "#ff6100",
              "sb_company_label_color": "#ff6100",
              "hide_img_mode": "1",
              "show_sidebar": "1",
              "sb_busy": "#c7b3b3",
              "sb_available": "#d6ebff"
            },
            "timeline": "modern",
            "datepicker": "top_calendar",
            "is_rtl": false,
            "app_config": {
              "clear_session": 0,
              "allow_switch_to_ada": 0,
              "predefined": []
            }
          });
        } catch (error) {
          console.error('SimplyBook iframe 위젯 로드 중 오류:', error);
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
      // 위젯 정리 로직이 필요한 경우 여기에 추가
    };
  }, []);

  return (
    <div 
      ref={widgetRef} 
      className={`simplybook-iframe-widget ${className}`}
      style={{ 
        position: 'relative',
        zIndex: 1000,
        minHeight: '800px',
        width: '100%'
      }}
    />
  );
}








