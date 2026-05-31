<script lang="ts">
	let { oncontinue }: { oncontinue?: () => void } = $props();

	const flakes = [
		{ left: '2%', delay: '0s', dur: '16s', size: '0.8rem' },
		{ left: '7%', delay: '3s', dur: '13s', size: '0.5rem' },
		{ left: '13%', delay: '7s', dur: '19s', size: '1rem' },
		{ left: '18%', delay: '1s', dur: '14s', size: '0.6rem' },
		{ left: '24%', delay: '5s', dur: '17s', size: '1.2rem' },
		{ left: '30%', delay: '9s', dur: '12s', size: '0.7rem' },
		{ left: '36%', delay: '2s', dur: '21s', size: '0.9rem' },
		{ left: '42%', delay: '6s', dur: '15s', size: '0.5rem' },
		{ left: '48%', delay: '0s', dur: '18s', size: '1.1rem' },
		{ left: '54%', delay: '4s', dur: '11s', size: '0.6rem' },
		{ left: '60%', delay: '8s', dur: '20s', size: '0.8rem' },
		{ left: '66%', delay: '1s', dur: '14s', size: '1rem' },
		{ left: '72%', delay: '10s', dur: '16s', size: '0.7rem' },
		{ left: '78%', delay: '3s', dur: '22s', size: '0.5rem' },
		{ left: '84%', delay: '7s', dur: '13s', size: '1.3rem' },
		{ left: '90%', delay: '5s', dur: '17s', size: '0.9rem' },
		{ left: '96%', delay: '2s', dur: '15s', size: '0.6rem' },
		{ left: '50%', delay: '11s', dur: '19s', size: '0.7rem' },
		{ left: '15%', delay: '12s', dur: '14s', size: '1.1rem' },
		{ left: '80%', delay: '13s', dur: '18s', size: '0.8rem' },
	];
	const stars = [
		{ top: '15%', left: '15%', size: '1.4rem', delay: '0s' },
		{ top: '25%', left: '80%', size: '1rem', delay: '1.5s' },
		{ top: '55%', left: '10%', size: '0.8rem', delay: '0.8s' },
		{ top: '70%', left: '75%', size: '1.2rem', delay: '2s' },
		{ top: '40%', left: '45%', size: '0.7rem', delay: '1.2s' },
	];
</script>

<!-- Background gradient (bottom layer) -->
<div class="fixed inset-0 bg-gradient-to-b from-[#D4E4F7] to-[#E8DFF5] -z-10"></div>

<!-- Snowflakes + stars (middle layer) -->
<div class="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
	{#each flakes as f}
		<span
			class="snowflake absolute top-[-8%] text-[#4B6A8E]/70"
			style="left:{f.left}; font-size:{f.size}; animation-delay:{f.delay}; animation-duration:{f.dur};"
		>❄</span>
	{/each}
	{#each stars as s}
		<span
			class="star absolute text-[#4B6A8E]/60"
			style="top:{s.top}; left:{s.left}; font-size:{s.size}; animation-delay:{s.delay};"
			>✦</span>
		{/each}
	</div>

<div class="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
	<div class="w-full max-w-lg bg-white/40 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl p-10 text-center relative z-10">
		<div class="text-4xl mb-6 gold-gradient">✝</div>

		<blockquote class="font-playfair italic text-xl md:text-2xl leading-relaxed gold-gradient mb-4">
			"Jesus dijo: dejen que los ninos vengan a mi, porque de ellos es el reino de los cielos"
		</blockquote>

		<div class="w-16 h-px bg-[#D4AF37]/40 mx-auto my-6"></div>

		<p class="font-montserrat text-slate-600 text-sm">
			Mateo 19:14
		</p>

		<p class="font-great-vibes text-lg text-[#D4AF37] mt-4">
			— Celebrando los 3 años de Amira —
		</p>
	</div>

	<button
		onclick={oncontinue}
		class="mt-6 font-montserrat text-sm font-bold text-indigo-900/80 bg-indigo-200/60 backdrop-blur-sm border border-indigo-300/60 px-8 py-3 rounded-full hover:bg-indigo-300/70 hover:text-indigo-900 transition-all"
	>
		Continuar
	</button>
</div>

<style>
	.gold-gradient {
		background: linear-gradient(to bottom, #8B5E0A, #C9922A, #D4A84B, #C9922A);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.snowflake {
		animation: fall linear infinite;
	}
	@keyframes fall {
		0%   { transform: translateY(0) rotate(0deg); opacity: 0.4; }
		100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
	}
	.star {
		animation: twinkle ease-in-out infinite;
	}
	@keyframes twinkle {
		0%, 100% { opacity: 0.1; transform: scale(0.8); }
		50%      { opacity: 0.5; transform: scale(1.2); }
	}
</style>
