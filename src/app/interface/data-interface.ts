export interface CardData {
	Name: string;
	title: string;
	phrase: string;
	songUrl: string;
	partyDateTime: string;
	partyLocation: string;
	dressCode: string;
	confirmationDeadline: string;
	userInstagram: string;
	hashtag: string;
	giftsData: {
		accountHolderName: string;
		cbuOrCvu: string;
		alias: string;
	},
	links: {
		googleMaps: string;
		saveDate: string;
		whatsapp: string;
		instagram: string;
	}
}