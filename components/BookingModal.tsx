import { useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Open SimplyBook.me in new tab
      window.open('https://emotionalstudios.simplybook.me/v2/', '_blank');
      onClose();
    }
  }, [isOpen, onClose]);

  return null;
};
