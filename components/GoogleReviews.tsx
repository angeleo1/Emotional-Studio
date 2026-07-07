import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

interface GoogleReviewsProps {
  isDark?: boolean;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({ isDark = false }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/google-reviews');
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data.reviews || []);
        setRating(data.data.rating);
        setTotalReviews(data.data.user_ratings_total);
      } else {
        setError(data.error || 'Failed to load reviews');
      }
    } catch (err) {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (starRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < starRating 
            ? 'text-[#F4B400] fill-[#F4B400]' 
            : 'text-zinc-300 dark:text-zinc-600'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6100]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">{error}</p>
          <button
            onClick={fetchReviews}
            className="px-4 py-2 bg-[#FF6100] text-white rounded-lg hover:bg-[#e55700] transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Review Stats */}
      <div className="flex items-center gap-4 mb-8">
        {rating && (
          <div className="text-center">
            <div className="text-5xl font-bold text-black dark:text-white">{rating.toFixed(1)}</div>
            <div className="flex gap-0.5 mt-2 justify-center">{renderStars(rating)}</div>
          </div>
        )}
        {totalReviews && (
          <div className="border-l border-zinc-200 dark:border-zinc-700 pl-4">
            <div className="text-lg font-semibold text-black dark:text-white">{totalReviews}</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Google reviews</div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.slice(0, 6).map((review, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border transition-all duration-300 ${
              isDark
                ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                : 'bg-zinc-50 border-zinc-100 hover:border-zinc-200'
            }`}
          >
            <Quote className="w-6 h-6 text-[#F4B400] mb-4" />
            
            <div className="flex gap-1 mb-3">{renderStars(review.rating)}</div>
            
            <p className={`text-sm leading-relaxed mb-4 line-clamp-4 ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {review.text}
            </p>
            
            <div className="flex items-center gap-3">
              {review.profile_photo_url && (
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <div className={`font-semibold text-sm ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  {review.author_name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {formatDate(review.time)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Reviews Link */}
      {reviews.length > 0 && (
        <div className="mt-8 text-center">
          <a
            href="https://g.page/emotionalstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#FF6100] text-sm font-semibold hover:gap-3 transition-all"
          >
            View all reviews on Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};
