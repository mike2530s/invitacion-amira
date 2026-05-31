<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Hero from '$lib/components/Hero.svelte';
	import Quote from '$lib/components/Quote.svelte';
	import RSVPForm from '$lib/components/RSVPForm.svelte';
	import LoadingState from '$lib/components/LoadingState.svelte';
	import SuccessState from '$lib/components/SuccessState.svelte';
	import ErrorState from '$lib/components/ErrorState.svelte';

	type Screen = 'hero' | 'quote' | 'form' | 'loading' | 'success' | 'error';

	let screen = $state<Screen>('hero');
	let rsvpData = $state<{ name: string; personas: number; asistencia: string } | null>(null);

	// ── Ambient Snowfall ──────────────────────────────────────────────────────
	// A continuous light snow effect that sits in the background of all guest screens.
	const ambientSnowflakes = [
		{ left: '10%', delay: '0s',   dur: '18s', size: '1rem'   },
		{ left: '25%', delay: '5s',   dur: '22s', size: '0.8rem' },
		{ left: '45%', delay: '2s',   dur: '16s', size: '1.2rem' },
		{ left: '60%', delay: '9s',   dur: '24s', size: '0.6rem' },
		{ left: '75%', delay: '4s',   dur: '19s', size: '1.4rem' },
		{ left: '90%', delay: '7s',   dur: '17s', size: '0.9rem' },
		{ left: '35%', delay: '12s',  dur: '20s', size: '1.1rem' },
		{ left: '85%', delay: '15s',  dur: '23s', size: '0.7rem' },
	];

	// ── Snowflake burst ───────────────────────────────────────────────────────
	// 12 directions evenly spaced around a circle (pre-calculated sin/cos × 140px)
	const burstFlakes = [
		{ tx:    0, ty: -140 }, { tx:   70, ty: -121 }, { tx:  121, ty:  -70 },
		{ tx:  140, ty:    0 }, { tx:  121, ty:   70 }, { tx:   70, ty:  121 },
		{ tx:    0, ty:  140 }, { tx:  -70, ty:  121 }, { tx: -121, ty:   70 },
		{ tx: -140, ty:    0 }, { tx: -121, ty:  -70 }, { tx:  -70, ty: -121 },
	];
	let burstId   = $state(0);
	let bursting  = $state(false);

	function triggerBurst() {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;
		burstId++;
		bursting = true;
		setTimeout(() => (bursting = false), 900);
	}

	// ── Screen navigation (View Transitions API with Svelte fly fallback) ────
	function navigate(next: Screen) {
		triggerBurst();
		if (!document.startViewTransition) {
			screen = next;
			return;
		}
		document.startViewTransition(() => {
			screen = next;
		});
	}

	function goToQuote()  { navigate('quote'); }
	function goToForm()   { navigate('form');  }
	function handleRetry(){ navigate('form');  }

	async function handleSubmit(data: { name: string; asistencia: string; personas: number }) {
		rsvpData = data;
		navigate('loading');

		try {
			const response = await fetch('/api/rsvp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});
			if (!response.ok) throw new Error(`Server error: ${response.status}`);
			navigate('success');
		} catch (err) {
			console.error('Error al enviar RSVP:', err);
			navigate('error');
		}
	}

	function handleHome() {
		screen = 'hero';
		rsvpData = null;
	}
</script>

<!-- ── Snowflake burst overlay ──────────────────────────────────────────── -->
{#if bursting}
	{#key burstId}
		<div class="burst-container" aria-hidden="true">
			{#each burstFlakes as flake, i}
				<span
					class="burst-flake"
					style="--tx: {flake.tx}px; --ty: {flake.ty}px; --delay: {i * 45}ms;"
				>❄</span>
			{/each}
		</div>
	{/key}
{/if}

<!-- ── Ambient Background Snow ───────────────────────────────────────────── -->
<div class="ambient-snow-container" aria-hidden="true">
	{#each ambientSnowflakes as flake}
		<span
			class="ambient-snow"
			style="left: {flake.left}; font-size: {flake.size}; animation-delay: {flake.delay}; animation-duration: {flake.dur};"
		>❄️</span>
	{/each}
</div>

<!-- ── Screen wrapper ────────────────────────────────────────────────────── -->
<div class="screen-root">
	{#key screen}
		<div
			in:fly={{ y: 48, duration: 560, easing: cubicOut, delay: 200 }}
			out:fly={{ y: -48, duration: 360, easing: cubicOut }}
			class="screen-slide"
		>
			{#if screen === 'hero'}
				<Hero onconfirm={goToQuote} />
			{:else if screen === 'quote'}
				<Quote oncontinue={goToForm} />
			{:else if screen === 'form'}
				<RSVPForm onsubmit={handleSubmit} />
			{:else if screen === 'loading'}
				<LoadingState />
			{:else if screen === 'success'}
				<SuccessState
					nombre={rsvpData?.name}
					personas={rsvpData?.personas}
					asistencia={rsvpData?.asistencia}
					onhome={handleHome}
				/>
			{:else if screen === 'error'}
				<ErrorState onretry={handleRetry} />
			{/if}
		</div>
	{/key}
</div>

<style>
	/* ── Layout ──────────────────────────────────────────────────────────── */
	.screen-root {
		/* Fixed to the viewport so absolute children have a stable reference */
		position: fixed;
		inset: 0;
		overflow: hidden; /* clips slides that are flying out */
	}

	.screen-slide {
		/* Absolute so old + new screen can overlap during the transition */
		position: absolute;
		inset: 0;
		/* Each screen scrolls independently inside the fixed container */
		overflow-y: auto;
		-webkit-overflow-scrolling: touch; /* smooth momentum scroll on iOS */
	}

	/* ── View Transitions (cross-fade + upward slide) ───────────────────── */
	:global(::view-transition-old(root)) {
		animation: vt-slide-out 0.36s cubic-bezier(0.4, 0, 1, 1) both;
	}
	:global(::view-transition-new(root)) {
		animation: vt-slide-in 0.56s cubic-bezier(0, 0, 0.2, 1) both;
	}

	@keyframes vt-slide-out {
		from { opacity: 1;  transform: translateY(0);     }
		to   { opacity: 0;  transform: translateY(-48px); }
	}
	@keyframes vt-slide-in {
		from { opacity: 0;  transform: translateY(48px);  }
		to   { opacity: 1;  transform: translateY(0);     }
	}

	/* ── Ambient Background Snow ─────────────────────────────────────────── */
	.ambient-snow-container {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 50; /* Above the screens so it's not hidden by their background colors */
		overflow: hidden;
	}

	.ambient-snow {
		position: absolute;
		top: -5%;
		color: rgba(255, 255, 255, 0.4);
		user-select: none;
		animation: fall linear infinite;
	}

	@keyframes fall {
		0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
		10%  { opacity: 0.6; }
		90%  { opacity: 0.6; }
		100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
	}

	/* ── Snowflake burst overlay ─────────────────────────────────────────── */
	.burst-container {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 9999;
		/* Centre-point for all flakes */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.burst-flake {
		position: absolute;
		/* Start at the centre of the viewport */
		top: 50%;
		left: 50%;
		font-size: 1.5rem;
		color: #93c5fd; /* blue-300, matches the app's ice palette */
		opacity: 0;
		user-select: none;
		animation: burst-out 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
		animation-delay: var(--delay, 0ms);
		/* Prevent emoji colour override */
		font-family: monospace;
	}

	@keyframes burst-out {
		0% {
			transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
			opacity: 1;
		}
		55% {
			opacity: 0.8;
		}
		100% {
			transform:
				translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)))
				scale(2)
				rotate(180deg);
			opacity: 0;
		}
	}

	/* ── Respect reduced-motion preference ───────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		:global(::view-transition-old(root)),
		:global(::view-transition-new(root)) {
			animation: none !important;
		}
	}
</style>
