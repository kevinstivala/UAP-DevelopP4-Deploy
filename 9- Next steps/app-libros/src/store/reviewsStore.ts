import {create} from "zustand";

interface Review {
    id: string
    bookId:string;
    user: string;
    text: string;
    rating: number;
    votes: number;
}

interface ReviewsState {
  reviews: Review[];
  addReview: (review: Review) => void;
  voteReview: (id: string, delta: number) => void;
}

export const useReviewsStore = create<ReviewsState>((set) => ({
    reviews: [],
    addReview: (review) =>
      set((state) => ({
        reviews: [...state.reviews, review], // Aquí 'state.reviews' es un arreglo de 'Review'
      })),
    voteReview: (id, delta) =>
      set((state) => ({
        reviews: state.reviews.map((review) =>
          review.id === id ? { ...review, votes: review.votes + delta } : review
        ),
      })),
  }));