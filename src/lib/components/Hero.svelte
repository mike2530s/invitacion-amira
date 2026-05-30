<script lang="ts">
	let { onconfirm }: { onconfirm?: () => void } = $props();

	const flakes = [
		{ left: "2%", delay: "0s", dur: "18s", size: "0.9rem" },
		{ left: "8%", delay: "4s", dur: "14s", size: "0.5rem" },
		{ left: "14%", delay: "1s", dur: "20s", size: "1.1rem" },
		{ left: "20%", delay: "6s", dur: "12s", size: "0.6rem" },
		{ left: "26%", delay: "2s", dur: "16s", size: "1.3rem" },
		{ left: "32%", delay: "8s", dur: "15s", size: "0.7rem" },
		{ left: "38%", delay: "0s", dur: "22s", size: "1rem" },
		{ left: "44%", delay: "5s", dur: "13s", size: "0.5rem" },
		{ left: "50%", delay: "3s", dur: "19s", size: "1.2rem" },
		{ left: "56%", delay: "7s", dur: "11s", size: "0.6rem" },
		{ left: "62%", delay: "1s", dur: "17s", size: "0.8rem" },
		{ left: "68%", delay: "9s", dur: "14s", size: "1rem" },
		{ left: "74%", delay: "4s", dur: "21s", size: "0.7rem" },
		{ left: "80%", delay: "0s", dur: "12s", size: "1.1rem" },
		{ left: "86%", delay: "6s", dur: "18s", size: "0.5rem" },
		{ left: "92%", delay: "2s", dur: "15s", size: "0.9rem" },
		{ left: "97%", delay: "8s", dur: "13s", size: "0.6rem" },
		{ left: "50%", delay: "10s", dur: "16s", size: "1rem" },
		{ left: "10%", delay: "12s", dur: "20s", size: "0.8rem" },
		{ left: "75%", delay: "11s", dur: "14s", size: "0.7rem" },
	];
</script>

<!-- Background gradient (bottom layer) -->
<div
	class="fixed inset-0 bg-gradient-to-b from-[#D4E4F7] to-[#E8DFF5] -z-10"
></div>

<!-- Falling snowflakes (middle layer) -->
<div class="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
	{#each flakes as f}
		<span
			class="snowflake absolute top-[-8%] text-[#4B6A8E]/70"
			style="left:{f.left}; font-size:{f.size}; animation-delay:{f.delay}; animation-duration:{f.dur};"
			>❄</span
		>
	{/each}
</div>

<div
	class="relative min-h-screen flex flex-col items-center justify-center px-4 py-12"
>
	<!-- Tagline -->
	<p
		class="font-playfair italic text-[#7BA7D4] text-base md:text-lg mb-4 text-center tracking-wide"
	>
		"Una aventura mágica y llena de alegría"
	</p>

	<!-- Avatar -->
	<div
		class="w-44 h-44 rounded-full overflow-hidden mx-auto relative mb-5 ring-4 ring-white/60 shadow-[0_0_30px_rgba(147,197,253,0.5)]"
	>
		<img
			src="/amira.jpg"
			alt="Amira - la cumpleanera"
			class="w-full h-full object-cover object-top"
		/>
	</div>

	<!-- Name & subtitle -->
	<h1
		class="font-great-vibes text-7xl md:text-8xl leading-tight mb-1 gold-text"
	>
		Amira
	</h1>
	<p class="font-playfair text-xl text-[#8B8BAE] mb-6">!Mis 3 años!</p>

	<!-- Glassmorphism info card -->
	<div
		class="w-full max-w-sm bg-white/40 backdrop-blur-md border border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-3xl p-6 text-center text-[#334155] relative z-10 space-y-4"
	>
		<!-- Misa -->
		<div>
			<p
				class="font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#7BA7D4] mb-1"
			>
				Santa Misa
			</p>
			<p class="font-montserrat text-sm font-semibold">
				Capilla de las Monjas
			</p>
			<p class="font-montserrat text-xs text-[#64748b] italic">
				Hora: por confirmar
			</p>
		</div>

		<div class="w-full h-px bg-white/60"></div>

		<!-- Fiesta -->
		<div>
			<p
				class="font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#7BA7D4] mb-1"
			>
				Festejo
			</p>
			<p class="font-montserrat text-sm font-semibold">3:00 PM</p>
			<p class="font-montserrat text-xs text-[#64748b]">
				Camino Alcocer Real Caminito #8
			</p>
		</div>

		<div class="w-full h-px bg-white/60"></div>

		<!-- Padres -->
		<div>
			<p
				class="font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#7BA7D4] mb-1"
			>
				Sus papás
			</p>
			<p class="font-montserrat text-sm">Azucena Mendoza</p>
			<p class="font-montserrat text-sm">Luis Manuel Molina</p>
		</div>

		<div class="w-full h-px bg-white/60"></div>

		<!-- Padrinos -->
		<div>
			<p
				class="font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#7BA7D4] mb-1"
			>
				Sus padrinos
			</p>
			<p class="font-montserrat text-sm">Angel Mendoza</p>
			<p class="font-montserrat text-sm">Daysi Perez</p>
		</div>

		<div class="w-full h-px bg-white/60"></div>

		<!-- Nota: sin tematica -->
		<p
			class="font-montserrat text-[11px] text-[#64748b] italic leading-relaxed"
		>
			La fiesta <strong>no tiene tematica</strong> -- los ninos pueden venir
			con su ropa normal
		</p>
	</div>

	<!-- Confirm button -->
	<button
		class="glow-btn relative mt-6 z-20 font-great-vibes text-xl text-white drop-shadow-md font-semibold px-10 py-3 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/90"
		onclick={onconfirm}
	>
		Confirmar Asistencia
	</button>
</div>

<style>
	.gold-text {
		background: linear-gradient(
			to right,
			#bf953f,
			#fcf6ba,
			#b38728,
			#fbf5b7
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.glow-btn {
		box-shadow:
			0 0 15px rgba(255, 255, 255, 0.6),
			inset 0 0 15px rgba(255, 255, 255, 0.8);
		transition: transform 0.2s ease;
	}
	.glow-btn:hover {
		transform: scale(1.03);
	}
	.glow-btn:active {
		transform: scale(0.97);
	}

	.snowflake {
		animation: fall linear infinite;
		opacity: 0.5;
	}

	@keyframes fall {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 0.5;
		}
		100% {
			transform: translateY(110vh) rotate(360deg);
			opacity: 0;
		}
	}
</style>
