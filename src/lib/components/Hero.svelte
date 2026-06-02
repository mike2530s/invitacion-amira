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

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Dancing+Script:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

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
		class="font-playfair italic text-[#7BA7D4] text-lg md:text-xl mb-4 text-center tracking-wide relative z-10"
	>
		"Una aventura mágica y llena de alegría"
	</p>

	<!-- Avatar + Elsa (anclados juntos para que siempre estén en sync) -->
	<div class="relative flex justify-center mb-5 w-full">
		<!-- Elsa: posicionada relativa al círculo de la niña -->
		<img
			src="/elsa.png"
			alt=""
			aria-hidden="true"
			class="elsa-deco absolute pointer-events-none select-none"
		/>

		<!-- Foto de Amira -->
		<div
			class="w-48 h-48 rounded-full overflow-hidden relative z-10 avatar-frost mr-14"
		>
			<img
				src="/amira.jpg"
				alt="Amira - la cumpleañera"
				class="w-full h-full object-cover object-top"
			/>
		</div>
	</div>

	<!-- Name & subtitle -->
	<h1 class="font-pinyon text-6xl md:text-8xl leading-tight mb-1 gold-text whitespace-nowrap overflow-visible" style="background: rgba(255,255,255,0.35); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); border-radius: 16px; padding: 4px 24px; display: inline-block;">
		Amira
	</h1>
	<p class="font-dancing font-bold text-5xl w-full text-center px-4 text-[#F472B6] mb-6">
		!Mis 3 años!
	</p>

	<!-- Glassmorphism info card -->
	<div
		class="w-full max-w-sm bg-white/40 backdrop-blur-md border border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-3xl p-6 text-center text-[#334155] relative z-10 space-y-4"
	>
		<!-- Misa -->
		<div>
			<p
				class="font-montserrat text-sm font-bold uppercase tracking-widest text-[#7BA7D4] mb-1"
			>
				Santa Misa
			</p>
			<p class="font-montserrat text-[15px] font-semibold">
				Capilla de las Monjas
			</p>
			<p class="font-montserrat text-sm text-[#64748b] italic">
				Hora: por confirmar
			</p>
		</div>

		<div class="w-full h-px bg-white/60"></div>

		<!-- Fiesta -->
		<div>
			<p
				class="font-montserrat text-sm font-bold uppercase tracking-widest text-[#7BA7D4] mb-1"
			>
				Festejo
			</p>
			<p class="font-montserrat text-[15px] font-semibold">3:00 PM</p>
			<p class="font-montserrat text-sm text-[#64748b]">
				<a
					href="https://maps.app.goo.gl/knKDtNFLgjzHp4SbA"
					target="_blank"
					rel="noopener noreferrer">Camino Alcocer Real Caminito #8</a
				>
			</p>
		</div>

		<div class="w-full h-px bg-white/60"></div>

		<!-- Padres -->
		<div>
			<p
				class="font-montserrat text-sm font-bold uppercase tracking-widest text-[#7BA7D4] mb-1"
			>
				Mis papás
			</p>
			<p class="font-montserrat text-[15px]">Azucena Mendoza</p>
			<p class="font-montserrat text-[15px]">Luis Manuel Molina</p>
		</div>

		<div class="w-full h-px bg-white/60"></div>

		<!-- Padrinos -->
		<div>
			<p
				class="font-montserrat text-sm font-bold uppercase tracking-widest text-[#7BA7D4] mb-1"
			>
				Mis padrinos
			</p>
			<p class="font-montserrat text-[15px]">Daysi Perez</p>
			<p class="font-montserrat text-[15px]">Angel Mendoza</p>
		</div>

		<div class="w-full h-px bg-white/60"></div>

		<!-- Nota: sin tematica -->
		<p
			class="font-montserrat text-[15px] text-[#64748b] italic leading-relaxed"
		>
			La fiesta <strong>no tiene tematica</strong> -- los ninos pueden venir
			con su ropa normal
		</p>
	</div>

	<!-- Confirm button -->
	<button
		class="relative mt-6 z-20 font-montserrat text-lg tracking-wide text-[#ffa5f2] font-bold px-10 py-3.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm"
		onclick={onconfirm}
	>
		Confirmar Asistencia
	</button>
</div>

<style>
	.font-pinyon {
		font-family: "Pinyon Script", cursive;
	}
	.font-dancing {
		font-family: "Dancing Script", cursive;
	}

	.gold-text {
		color: #C8860A;
		text-shadow:
			0 0 12px rgba(255,255,255,0.7),
			0 0 24px rgba(255,255,255,0.4),
			0 0 20px rgba(255, 200, 50, 0.6),
			0 2px 4px rgba(80, 40, 0, 0.5);
		filter: none;
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

	/* Elsa decorativa — anclada al avatar para ser siempre responsive */
	.avatar-frost {
		box-shadow:
			0 0 20px rgba(180, 220, 255, 0.5),
			0 0 50px rgba(200, 230, 255, 0.3),
			inset 0 0 30px rgba(255, 255, 255, 0.25);
	}
	.avatar-frost::before {
		content: "";
		position: absolute;
		inset: -6px;
		border-radius: 50%;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.8),
			rgba(180, 220, 255, 0.3),
			rgba(200, 240, 255, 0.6),
			rgba(255, 255, 255, 0.9)
		);
		-webkit-mask: radial-gradient(
			circle,
			transparent 60%,
			black 62%,
			transparent 68%
		);
		mask: radial-gradient(
			circle,
			transparent 60%,
			black 62%,
			transparent 68%
		);
		pointer-events: none;
		z-index: 0;
	}
	.avatar-frost::after {
		content: "";
		position: absolute;
		inset: -12px;
		border-radius: 50%;
		background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 255, 255, 0.4) 0%,
			transparent 50%
		);
		pointer-events: none;
		z-index: -1;
	}

	.elsa-deco {
		/* Elsa sale hacia arriba hasta tocar el texto */
		right: calc(50% - 14rem);
		top: -1rem;
		transform: translateX(1em);
		width: 16rem;
		z-index: 0; /* detrás de la foto (z-10) y del texto (z-10) */
		opacity: 0.92;

		/* Máscara: desvanece los 4 bordes (arriba, abajo, izquierda y derecha)
		   usando intersección de gradientes → los bordes se funden con el fondo */
		mask-image: linear-gradient(
				to bottom,
				transparent 0%,
				black 22%,
				black 76%,
				transparent 100%
			),
			linear-gradient(
				to right,
				transparent 0%,
				black 18%,
				black 82%,
				transparent 100%
			),
			radial-gradient(
				ellipse 85% 88% at 55% 50%,
				black 20%,
				rgba(0, 0, 0, 0.5) 58%,
				transparent 88%
			);
		mask-composite: intersect;

		-webkit-mask-image: linear-gradient(
				to bottom,
				transparent 0%,
				black 22%,
				black 76%,
				transparent 100%
			),
			linear-gradient(
				to right,
				transparent 0%,
				black 18%,
				black 82%,
				transparent 100%
			),
			radial-gradient(
				ellipse 85% 88% at 55% 50%,
				black 20%,
				rgba(0, 0, 0, 0.5) 58%,
				transparent 88%
			);
		-webkit-mask-composite: source-in;

		animation: elsaFloat 5s ease-in-out infinite;
	}

	@keyframes elsaFloat {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-12px);
		}
	}
</style>
