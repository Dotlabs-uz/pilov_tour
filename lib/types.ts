export interface Timestamp {
	seconds: number;
	nanoseconds: number;
}

export interface LocalizedString {
	en?: string;
	ru?: string;
	uz?: string;
	sp?: string;
	it?: string;
	ge?: string;
	uk?: string;
}

export interface Duration {
	nights?: number;
	days?: number;
}

export interface TourData {
	createdAt: Timestamp;
	dates: any[]; // You might want to define a more specific type for dates if you have its structure
	description: LocalizedString;
	duration: Duration;
	images: string[];
	inclusions: {
		included: any[]; // Define specific type if available
		notIncluded: any[]; // Define specific type if available
	};
	itinerary: any[]; // Define specific type if available
	location: LocalizedString;
	maxGroupCount: number;
	price: string;
	style: string;
	title: LocalizedString;
	updatedAt: Timestamp;
}

export interface HighlightData {
	id: string;
	title: string;
	coverImage: string;
}

export interface CulturalHighlightCard {
	id: string;
	title: string;
	emoji: string;
	description: string;
	image: string;
	color: string;
	rotate: string;
}
