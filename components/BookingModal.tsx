// BookingModal is now replaced with direct link
// This component is kept for compatibility but booking now opens in new tab

import React, { useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Open SimplyBook.me in new tab immediately
      window.open('https://emotionalstudios.simplybook.me/v2/', '_blank');
      // Close modal state immediately
      onClose();
    }
  }, [isOpen, onClose]);

  return null;
};
