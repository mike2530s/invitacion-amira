<script lang="ts">
	let { onretry, oncontact }: { onretry?: () => void; oncontact?: () => void } = $props();

	const flakes = [
		{ left: '2%', delay: '0s', dur: '14s', size: '0.7rem' },
		{ left: '8%', delay: '3s', dur: '11s', size: '0.5rem' },
		{ left: '15%', delay: '6s', dur: '18s', size: '1rem' },
		{ left: '22%', delay: '1s', dur: '13s', size: '0.6rem' },
		{ left: '29%', delay: '5s', dur: '16s', size: '1.2rem' },
		{ left: '36%', delay: '8s', dur: '12s', size: '0.8rem' },
		{ left: '43%', delay: '2s', dur: '20s', size: '0.7rem' },
		{ left: '50%', delay: '7s', dur: '15s', size: '0.5rem' },
		{ left: '57%', delay: '0s', dur: '17s', size: '1.1rem' },
		{ left: '64%', delay: '4s', dur: '10s', size: '0.6rem' },
		{ left: '71%', delay: '9s', dur: '19s', size: '0.9rem' },
		{ left: '78%', delay: '1s', dur: '14s', size: '1rem' },
		{ left: '85%', delay: '6s', dur: '21s', size: '0.7rem' },
		{ left: '91%', delay: '3s', dur: '12s', size: '0.5rem' },
		{ left: '96%', delay: '8s', dur: '16s', size: '0.8rem' },
		{ left: '35%', delay: '10s', dur: '18s', size: '1rem' },
		{ left: '65%', delay: '11s', dur: '13s', size: '0.6rem' },
		{ left: '10%', delay: '12s', dur: '20s', size: '1.1rem' },
		{ left: '80%', delay: '13s', dur: '15s', size: '0.9rem' },
		{ left: '45%', delay: '14s', dur: '17s', size: '0.7rem' },
	];
</script>

<!-- Background gradient -->
<div class="fixed inset-0 bg-gradient-to-br from-pink-100 via-white to-cyan-100 -z-10"></div>

<!-- Falling snowflakes -->
<div class="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
	{#each flakes as f}
		<span
			class="snowflake absolute top-[-8%] text-[#4B6A8E]/65"
			style="left:{f.left}; font-size:{f.size}; animation-delay:{f.delay}; animation-duration:{f.dur};"
		>❄</span>
	{/each}
</div>

<div class="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
	<!-- Red X circle (3D, overlaps card) -->
	<div class="relative z-10 mb-0">
		<div class="x-circle w-24 h-24 flex items-center justify-center">
			<span class="text-4xl text-red-500 select-none font-bold">✕</span>
		</div>
	</div>

	<!-- Glassmorphism card (starts under the circle) -->
	<div class="w-full max-w-md bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8 pt-16 -mt-12 shadow-lg text-center relative z-0">
		<h1 class="font-playfair text-xl md:text-2xl text-slate-700 mb-4">
			!Uy! Algo se congelo en el camino.
		</h1>

		<p class="font-montserrat text-sm text-slate-500 leading-relaxed mb-6">
			No pudimos procesar tu confirmacion. Revisa tu conexion o intenta de nuevo mas tarde.
		</p>

		<button
			onclick={onretry}
			class="w-full bg-pink-200 text-slate-700 font-semibold py-4 rounded-full transition-transform active:scale-95 font-montserrat text-sm mb-3"
		>
			Intentar de nuevo
		</button>

		<button
			onclick={oncontact}
			class="w-full bg-cyan-100 text-slate-700 font-semibold py-4 rounded-full transition-transform active:scale-95 font-montserrat text-sm"
		>
			Contactar a los organizadores
		</button>
	</div>
</div>

<style>
	.x-circle {
		background: rgba(254, 202, 202, 0.4);
		backdrop-filter: blur(8px);
		border: 2px solid rgba(252, 165, 165, 0.8);
		box-shadow: 0 0 30px rgba(248, 113, 113, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.9);
		border-radius: 9999px;
	}
	.snowflake {
		animation: fall linear infinite;
	}
	@keyframes fall {
		0%   { transform: translateY(0) rotate(0deg); opacity: 0.3; }
		100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
	}
</style>
