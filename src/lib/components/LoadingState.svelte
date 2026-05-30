<div class="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#D4E4F7] to-[#E8DFF5] px-4">
	<!-- Glowing snowflake -->
	<div class="snowflake-glow w-28 h-28 rounded-full flex items-center justify-center mb-8">
		<span class="text-5xl select-none">❄</span>
	</div>

	<p class="font-playfair text-2xl md:text-3xl text-slate-800 mb-4 text-center">
		Confirmando Asistencia
	</p>

	<p class="font-montserrat text-sm text-slate-500 animate-pulse">
		Guardando tu confirmación con mucho amor...
	</p>
</div>

<style>
	.snowflake-glow {
		box-shadow: 0 0 50px rgba(255, 255, 255, 0.9), inset 0 0 20px rgba(255, 255, 255, 0.8);
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(4px);
		animation: pulse-glow 1.5s ease-in-out infinite;
	}

	@keyframes pulse-glow {
		0%, 100% {
			box-shadow: 0 0 50px rgba(255, 255, 255, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.6);
		}
		50% {
			box-shadow: 0 0 70px rgba(255, 255, 255, 1), inset 0 0 30px rgba(255, 255, 255, 0.9);
		}
	}
</style>
