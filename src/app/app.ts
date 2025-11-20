import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CardData } from './interface/data-interface';

@Component({
	selector: 'app-root',
	imports: [],
	templateUrl: './app.html',
})
export class App {
	// Card Data
	data: CardData = {
		Name: 'Luciana',
		title: '¡Mis 15 años!',
		phrase: 'La noche que soñé desde pequeña finalmente llegó y quiero que seas parte de ella.',
		songUrl: 'assets/song/song.mp3',
		partyDateTime: '27 de Septiembre a las 22:00hs hasta 5:00hs',
		partyLocation: 'Salón de Fiestas P.A.R. - Córdoba 1850 Yerba Buena - Tucumán',
		dressCode: 'Elegante (Se reserva el rojo y dorado para la cumpleañera)',
		confirmationDeadline: '18/9/2025',
		userInstagram: '',
		hashtag: '#mis15luciana',
		giftsData: {
			accountHolderName: 'Luciana Cuenca',
			cbuOrCvu: '',
			alias: 'luciana-ac2010'
		},
		links: {
			googleMaps: 'https://maps.app.goo.gl/6pVNkeBWXTHFJfRw5',
			saveDate: '',
			whatsapp: 'https://wa.me/+5493813684015',
			instagram: ''
		}
	}

	//Countdown
	private endDate: Date = new Date(2025, 8, 27, 22, 0, 0);
	remainingDays = signal(0);
	remainingHours = signal (0);
	remainingMinutes = signal (0);
	remainingSeconds = signal (0);

	//Audio
	isPlaying = signal(false);
	private audio = new Audio(this.data.songUrl);

	private destroyRef = inject(DestroyRef);

	constructor() {
		//Audio config
		this.audio.preload = 'metadata';
		this.audio.loop = true;
		this.audio.addEventListener('ended', () => {
			this.isPlaying.set(false);
		});

		//Countdown interval
		const id = setInterval(() => this.updateCountdown(), 5000);
		this.updateCountdown();

		//cleanup
		this.destroyRef.onDestroy(() => {
			clearInterval(id);
			this.audio.pause();
			this.audio.src = '';
		})
	}

	//UI Actions
	toggleMusic() {
  		if (this.isPlaying()) {
    		this.audio.pause();
  		} else {
    		this.audio.play();
  		}
  		this.isPlaying.set(!this.isPlaying());
	}

	goMap() 		{ window.open(this.data.links.googleMaps); }
	saveDate() 		{ window.open(this.data.links.saveDate); }
	openwhatsapp() 	{ window.open(this.data.links.whatsapp); }

	copy(event: MouseEvent) {
		// Obtener el elemento padre del ícono de copia (el elemento <p>)
		const p = (event.target as HTMLElement).closest('p');
		if (!p) return alert('No se encontró el elemento para copiar.');
		const text = p.innerText;

		const t = document.createElement('textarea');
		t.value = text;
		document.body.appendChild(t);
		t.select();

		try {
			const ok = document.execCommand('copy');
			if (ok) { p.classList.remove('bg-slate-200'); p.classList.add('bg-green-200'); }
		}
		catch (e) { console.error('Error al copiar el texto:', e); }
		// Eliminar el textarea temporal
		document.body.removeChild(t);
	}

	//Logic countdown
	private updateCountdown(): void {
		const now = Date.now();
		const diff = this.endDate.getTime() - now;

		// La cuenta regresiva ha terminado
		if (diff <= 0) {
			this.remainingDays.set(0);
      		this.remainingHours.set(0);
      		this.remainingMinutes.set(0);
      		this.remainingSeconds.set(0);
      		return;
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    	const hours = Math.floor(diff / (1000 * 60 * 60)) - days * 24;
    	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		this.remainingDays.set(days);
    	this.remainingHours.set(hours);
    	this.remainingMinutes.set(minutes);
    	this.remainingSeconds.set(seconds);
	}
}