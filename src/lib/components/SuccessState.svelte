<script lang="ts">
	let { nombre, personas, asistencia, oncalendar }: {
		nombre?: string;
		personas?: number;
		asistencia?: string;
		oncalendar?: () => void;
	} = $props();

	const attending = asistencia === 'si';

	const flakes = [
		{ left: '2%', delay: '0s', dur: '15s', size: '0.8rem' },
		{ left: '7%', delay: '4s', dur: '12s', size: '0.5rem' },
		{ left: '13%', delay: '1s', dur: '19s', size: '1rem' },
		{ left: '19%', delay: '6s', dur: '14s', size: '0.6rem' },
		{ left: '25%', delay: '2s', dur: '17s', size: '1.1rem' },
		{ left: '31%', delay: '8s', dur: '13s', size: '0.7rem' },
		{ left: '37%', delay: '0s', dur: '21s', size: '0.9rem' },
		{ left: '43%', delay: '5s', dur: '16s', size: '0.5rem' },
		{ left: '49%', delay: '3s', dur: '18s', size: '1.2rem' },
		{ left: '55%', delay: '7s', dur: '11s', size: '0.6rem' },
		{ left: '61%', delay: '1s', dur: '20s', size: '0.8rem' },
		{ left: '67%', delay: '9s', dur: '14s', size: '1rem' },
		{ left: '73%', delay: '4s', dur: '22s', size: '0.7rem' },
		{ left: '79%', delay: '0s', dur: '13s', size: '0.5rem' },
		{ left: '85%', delay: '6s', dur: '17s', size: '1.1rem' },
		{ left: '91%', delay: '2s', dur: '15s', size: '0.9rem' },
		{ left: '96%', delay: '8s', dur: '12s', size: '0.6rem' },
		{ left: '45%', delay: '10s', dur: '19s', size: '0.7rem' },
		{ left: '12%', delay: '11s', dur: '16s', size: '1rem' },
		{ left: '70%', delay: '12s', dur: '18s', size: '0.8rem' },
	];
</script>

<!-- Background gradient -->
<div class="fixed inset-0 bg-gradient-to-b from-[#D4E8F7] via-[#EBE4F5] to-[#C8DFF0] -z-10"></div>

<!-- Falling snowflakes -->
<div class="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
		{#each flakes as f}
			<span
				class="flake absolute top-[-8%] text-[#4B6A8E]/70"
				style="left:{f.left}; font-size:{f.size}; animation-delay:{f.delay}; animation-duration:{f.dur};"
			>❄</span>
		{/each}
	</div>

<div class="relative min-h-screen flex flex-col items-center justify-center px-5 py-12">
	<!-- Big crystal checkmark OR snowflake for no-show -->
	<div class="crystal-circle mb-6">
		<span class="text-5xl select-none">{attending ? '✓' : '◇'}</span>
	</div>

	<!-- Headline -->
	<h1 class="font-great-vibes text-5xl mb-1 text-center ice-title">
		{attending ? '¡Nos vemos pronto!' : '¡Gracias por avisarnos!'}
	</h1>

	<!-- Subheadline -->
	<p class="font-playfair italic text-[#6B8FBF] text-sm mb-6 text-center px-4">
		{attending
			? 'Tu confirmación fue registrada con mucho amor'
			: 'Lamentamos que no puedas acompañarnos — te enviamos un abrazo'}
	</p>

	<!-- Summary card -->
	<div class="glass-card w-full max-w-xs mb-5">

		<!-- Guest data -->
		<div class="space-y-2 mb-4">
			{#if nombre}
				<div class="row-item">
					<span class="row-label">Nombre</span>
					<span class="row-value">{nombre}</span>
				</div>
			{/if}
			{#if personas != null}
				<div class="row-item">
					<span class="row-label">Personas</span>
					<span class="row-value">{personas} {personas === 1 ? 'persona' : 'personas'}</span>
				</div>
			{/if}
			<div class="row-item">
				<span class="row-label">Asistencia</span>
				<span class="row-value {attending ? 'text-emerald-600' : 'text-rose-400'}">
					{attending ? 'Confirmada' : 'No asistirá'}
				</span>
			</div>
		</div>

		{#if attending}
			<!-- Event reminder -->
			<div class="divider"></div>
			<div class="mt-3 space-y-2">
				<p class="text-[10px] font-bold uppercase tracking-widest text-[#7BA7D4] text-center font-montserrat">
					Santa Misa
				</p>
				<p class="text-xs text-center text-slate-600 font-montserrat">
					Capilla de las Monjas · <em>Hora por confirmar</em>
				</p>

				<div class="divider mt-2"></div>

				<p class="text-[10px] font-bold uppercase tracking-widest text-[#7BA7D4] text-center font-montserrat mt-2">
					Festejo — 3:00 PM
				</p>
				<p class="text-xs text-center text-slate-600 font-montserrat">
					Camino Alcocer Real Caminito #8
				</p>
			</div>
		{/if}
	</div>

	<!-- Calendar button (only if attending) -->
	{#if attending}
		<button
			onclick={oncalendar}
			class="cal-btn font-montserrat text-sm font-semibold"
		>
			Guardar en mi calendario
		</button>
	{/if}

	<!-- Closing message from family -->
	<p class="font-playfair italic text-[#8AADD4] text-xs mt-6 text-center px-6 leading-relaxed">
		Con cariño — Azucena, Luis Manuel, Angel & Daysi
	</p>
</div>

<style>
	/* ── Snowflakes ── */
	.flake {
		animation: fall linear infinite;
	}
	@keyframes fall {
		0%   { transform: translateY(0) rotate(0deg); opacity: 0.3; }
		100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
	}

	/* ── Crystal circle ── */
	.crystal-circle {
		width: 7rem;
		height: 7rem;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.35);
		backdrop-filter: blur(12px);
		border: 2px solid rgba(255, 255, 255, 0.85);
		box-shadow:
			0 0 40px rgba(147, 197, 253, 0.45),
			inset 0 0 20px rgba(255, 255, 255, 0.9);
		animation: pulse-crystal 3s ease-in-out infinite;
	}
	@keyframes pulse-crystal {
		0%, 100% { box-shadow: 0 0 40px rgba(147,197,253,0.45), inset 0 0 20px rgba(255,255,255,0.9); }
		50%       { box-shadow: 0 0 60px rgba(147,197,253,0.65), inset 0 0 28px rgba(255,255,255,1);   }
	}

	/* ── Ice title ── */
	.ice-title {
		background: linear-gradient(to right, #3B82C4, #7EC8E3, #3B82C4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		filter: drop-shadow(0 2px 6px rgba(100, 160, 220, 0.4));
	}

	/* ── Glass card ── */
	.glass-card {
		background: rgba(255, 255, 255, 0.45);
		backdrop-filter: blur(14px);
		border: 1px solid rgba(255, 255, 255, 0.75);
		border-radius: 1.75rem;
		padding: 1.25rem 1.5rem;
		box-shadow: 0 8px 32px rgba(100, 160, 220, 0.12);
	}

	/* ── Rows ── */
	.row-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}
	.row-label {
		font-family: 'Montserrat', sans-serif;
		font-size: 0.7rem;
		font-weight: 600;
		color: #6B8FBF;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		flex-shrink: 0;
	}
	.row-value {
		font-family: 'Montserrat', sans-serif;
		font-size: 0.82rem;
		font-weight: 700;
		color: #334155;
		text-align: right;
	}
	.divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.65);
		border-radius: 9999px;
	}

	/* ── Calendar button ── */
	.cal-btn {
		background: linear-gradient(135deg, #60A5FA, #818CF8);
		color: white;
		padding: 0.85rem 2rem;
		border-radius: 9999px;
		box-shadow: 0 8px 20px rgba(96, 165, 250, 0.4);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	.cal-btn:hover  { transform: scale(1.03); box-shadow: 0 12px 28px rgba(96,165,250,0.5); }
	.cal-btn:active { transform: scale(0.97); }
</style>
