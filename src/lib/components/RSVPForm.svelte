<script lang="ts">
	let { onsubmit }: { onsubmit: (data: { name: string; asistencia: string; personas: number }) => void } = $props();

	let name = $state('');
	let asistencia = $state('');
	let personas = $state(1);

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!name.trim() || !asistencia) return;
		onsubmit({ name: name.trim(), asistencia, personas });
	}

	const flakes = [
		{ left: '3%', delay: '0s', dur: '17s', size: '0.7rem' },
		{ left: '9%', delay: '5s', dur: '14s', size: '0.5rem' },
		{ left: '16%', delay: '2s', dur: '20s', size: '1.1rem' },
		{ left: '22%', delay: '7s', dur: '12s', size: '0.6rem' },
		{ left: '28%', delay: '1s', dur: '18s', size: '0.9rem' },
		{ left: '34%', delay: '9s', dur: '15s', size: '1.2rem' },
		{ left: '40%', delay: '3s', dur: '21s', size: '0.7rem' },
		{ left: '46%', delay: '6s', dur: '13s', size: '0.5rem' },
		{ left: '52%', delay: '0s', dur: '16s', size: '1rem' },
		{ left: '58%', delay: '4s', dur: '11s', size: '0.6rem' },
		{ left: '64%', delay: '8s', dur: '19s', size: '0.8rem' },
		{ left: '70%', delay: '2s', dur: '14s', size: '1.1rem' },
		{ left: '76%', delay: '10s', dur: '17s', size: '0.7rem' },
		{ left: '82%', delay: '5s', dur: '22s', size: '0.5rem' },
		{ left: '88%', delay: '1s', dur: '13s', size: '1rem' },
		{ left: '94%', delay: '7s', dur: '18s', size: '0.9rem' },
		{ left: '98%', delay: '3s', dur: '15s', size: '0.6rem' },
		{ left: '25%', delay: '11s', dur: '20s', size: '0.8rem' },
		{ left: '60%', delay: '12s', dur: '14s', size: '1.2rem' },
		{ left: '45%', delay: '13s', dur: '16s', size: '0.7rem' },
	];
	const sparkles = [
		{ top: '20%', left: '10%', size: '1rem', delay: '0s' },
		{ top: '35%', left: '85%', size: '0.8rem', delay: '1.5s' },
		{ top: '60%', left: '18%', size: '1.2rem', delay: '0.7s' },
		{ top: '75%', left: '70%', size: '0.6rem', delay: '2s' },
	];
</script>

<!-- Background gradient -->
<div class="fixed inset-0 bg-gradient-to-b from-[#D4E4F7] to-[#E8DFF5] -z-10"></div>

<!-- Falling snowflakes + sparkles -->
<div class="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
		{#each flakes as f}
			<span
				class="snowflake absolute top-[-8%] text-[#4B6A8E]/70"
				style="left:{f.left}; font-size:{f.size}; animation-delay:{f.delay}; animation-duration:{f.dur};"
			>❄</span>
		{/each}
		{#each sparkles as s}
			<span
				class="sparkle absolute text-pink-200/25"
				style="top:{s.top}; left:{s.left}; font-size:{s.size}; animation-delay:{s.delay};"
			>◇</span>
		{/each}
	</div>

<div class="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
	<form
		onsubmit={handleSubmit}
		class="w-full max-w-lg bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl p-6 relative z-10"
	>
		<h1 class="font-great-vibes text-4xl text-pink-500 text-center mb-8">
			Confirma asistencia
		</h1>

		<!-- Name input -->
		<div class="mb-6">
			<label for="name" class="block font-montserrat text-sm text-slate-500 mb-2">Tu nombre completo</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				placeholder="Escribe tu nombre"
				class="w-full bg-white rounded-xl border border-slate-200 px-5 py-4 text-slate-700 shadow-inner outline-none focus:ring-2 focus:ring-pink-300/50 transition-all"
			/>
		</div>

		<!-- Yes / No pills -->
		<fieldset class="mb-6 border-0 p-0 m-0">
			<legend class="block font-montserrat text-sm text-slate-500 mb-3">¿Asistirás?</legend>
			<div class="flex gap-4">
				<button
					type="button"
					onclick={() => (asistencia = 'si')}
					class="flex-1 py-3 px-6 rounded-full font-montserrat text-sm font-semibold transition-all {asistencia === 'si' ? 'bg-gradient-to-r from-pink-300 to-pink-400 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}"
				>
					Sí, asistiré
				</button>
				<button
					type="button"
					onclick={() => (asistencia = 'no')}
					class="flex-1 py-3 px-6 rounded-full font-montserrat text-sm font-semibold transition-all {asistencia === 'no' ? 'bg-gradient-to-r from-pink-300 to-pink-400 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}"
				>
					No podré
				</button>
			</div>
		</fieldset>

		<!-- Number of people dropdown -->
		<div class="mb-8">
			<label for="personas" class="block font-montserrat text-sm text-slate-500 mb-2">Número de personas</label>
			<select
				id="personas"
				bind:value={personas}
				class="w-full bg-white rounded-xl border border-slate-200 px-5 py-4 text-slate-700 outline-none focus:ring-2 focus:ring-pink-300/50 transition-all appearance-none"
			>
				<option value={1}>1 Persona</option>
				<option value={2}>2 Personas</option>
				<option value={3}>3 Personas</option>
				<option value={4}>4 Personas</option>
				<option value={5}>5 Personas</option>
			</select>
		</div>

		<!-- Submit -->
		<button
			type="submit"
			disabled={!name.trim() || !asistencia}
			class="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-4 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat text-base"
		>
			Enviar confirmación
		</button>
	</form>
</div>

<style>
	.snowflake {
		animation: fall linear infinite;
	}
	@keyframes fall {
		0%   { transform: translateY(0) rotate(0deg); opacity: 0.4; }
		100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
	}
	.sparkle {
		animation: glow ease-in-out infinite;
	}
	@keyframes glow {
		0%, 100% { opacity: 0.1; transform: scale(0.8); }
		50%      { opacity: 0.4; transform: scale(1.1); }
	}
</style>
