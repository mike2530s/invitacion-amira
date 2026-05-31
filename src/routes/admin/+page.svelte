<script lang="ts">
	import { onMount } from 'svelte';

	let password = $state('');
	let error = $state('');
	let authenticated = $state(false);
	let isLoggingIn = $state(false);
	let showPassword = $state(false);

	// Navigation
	let currentTab = $state<'dashboard' | 'invitados' | 'ajustes'>('dashboard');
	
	// Datos reales
	let invitados = $state<{ fecha: string; nombre: string; asistencia: string; personas: number }[]>([]);
	let loadingData = $state(false);

	// Estadísticas dinámicas
	let stats = $derived([
		{ label: 'Total', count: invitados.length, bg: '#dbeafe', color: '#1d4ed8', icon: '◆' },
		{ label: 'Confirman', count: invitados.filter(i => i.asistencia === 'si').length, bg: '#dcfce7', color: '#15803d', icon: '✓' },
		{ label: 'No asisten', count: invitados.filter(i => i.asistencia === 'no').length, bg: '#fee2e2', color: '#b91c1c', icon: '✗' },
		{ label: 'Personas', count: invitados.filter(i => i.asistencia === 'si').reduce((acc, curr) => acc + (Number(curr.personas) || 0), 0), bg: '#f3e8ff', color: '#7e22ce', icon: '✦' },
	]);

	let confirmados = $derived(invitados.filter(i => i.asistencia === 'si'));
	let noAsisten = $derived(invitados.filter(i => i.asistencia === 'no'));

	onMount(() => {
		if (sessionStorage.getItem('admin_auth') === 'true') {
			authenticated = true;
			loadData();
		}
	});

	async function handleLogin() {
		isLoggingIn = true;
		error = '';
		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});
			
			if (res.ok) {
				sessionStorage.setItem('admin_auth', 'true');
				authenticated = true;
				loadData();
			} else {
				error = 'Contraseña incorrecta';
				password = '';
			}
		} catch (err) {
			error = 'Error de conexión';
		} finally {
			isLoggingIn = false;
		}
	}

	function logout() {
		sessionStorage.removeItem('admin_auth');
		authenticated = false;
		currentTab = 'dashboard';
	}

	async function loadData() {
		loadingData = true;
		try {
			const res = await fetch('/api/rsvp');
			if (res.ok) {
				const data = await res.json();
				invitados = data.reverse(); 
			}
		} catch (err) {
			console.error("Error cargando invitados:", err);
		} finally {
			loadingData = false;
		}
	}

	function handleDownloadCSV() {
		// Crear el CSV
		let csvContent = "data:text/csv;charset=utf-8,Fecha,Nombre,Asistencia,Personas\n";
		invitados.forEach(row => {
			csvContent += `${row.fecha},${row.nombre},${row.asistencia},${row.personas}\n`;
		});
		
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "invitados_amira.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

{#if !authenticated}
	<!-- LOGIN SCREEN -->
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D4E4F7] to-[#E8DFF5] px-4">
		<div class="w-full max-w-sm bg-white/40 backdrop-blur-md border border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl p-8 text-center">
			<h1 class="font-playfair text-xl text-slate-700 mb-2">Admin — Amira</h1>
			<p class="font-montserrat text-xs text-slate-500 mb-6">Ingresa la contraseña de administrador</p>

			<form
				onsubmit={(e) => { e.preventDefault(); handleLogin(); }}
				class="flex flex-col gap-4"
			>
				<div class="relative w-full">
					<input
						type={showPassword ? "text" : "password"}
						bind:value={password}
						placeholder="Contraseña"
						class="w-full bg-white rounded-xl border border-slate-200 px-5 py-3.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-300 transition-all text-center"
					/>
					<button
						type="button"
						class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
						onclick={() => showPassword = !showPassword}
						title="Mostrar/Ocultar contraseña"
					>
						{#if showPassword}
							<span class="text-sm">🙈</span>
						{:else}
							<span class="text-sm">👁️</span>
						{/if}
					</button>
				</div>
				{#if error}
					<p class="font-montserrat text-xs text-red-500">{error}</p>
				{/if}
				<button
					type="submit"
					disabled={isLoggingIn}
					class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-xl transition-all active:scale-95 shadow-md"
				>
					{isLoggingIn ? 'Verificando...' : 'Entrar'}
				</button>
			</form>
		</div>
	</div>
{:else}
	<!-- 📊 DASHBOARD -->
	<div class="max-w-md mx-auto h-screen bg-gray-50 flex flex-col relative overflow-hidden shadow-2xl border-x border-gray-200">

		<!-- CABECERA AZUL -->
		<header class="bg-blue-100 px-6 py-4 flex justify-between items-center rounded-b-[2rem] shadow-sm z-10 flex-shrink-0">
			<button onclick={logout} class="text-blue-900 font-bold text-xl hover:bg-blue-200 px-2 rounded-lg" title="Cerrar sesion">&lt;</button>
			<div class="text-center">
				<h1 class="font-extrabold text-blue-950 text-lg tracking-tight">Admin - Amira</h1>
				<p class="text-xs text-blue-700 font-medium">Cumpleaños 3 años</p>
			</div>
			<button onclick={loadData} class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-inner cursor-pointer" title="Recargar">
				↻
			</button>
		</header>

		<!-- CONTENIDO SCROLLABLE -->
		<main class="flex-1 overflow-y-auto pb-36 relative">
			{#if loadingData}
				<div class="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
					<span class="text-4xl animate-spin">❄️</span>
					<p class="mt-4 font-montserrat text-sm text-slate-500 font-semibold">Cargando invitados...</p>
				</div>
			{/if}

			{#if currentTab === 'dashboard'}
				<!-- STATS -->
				<div class="grid grid-cols-4 gap-2 px-4 mt-6">
					{#each stats as stat}
						<div
							class="flex flex-col items-center justify-center rounded-2xl py-3 shadow-sm border border-white/50"
							style="background-color: {stat.bg}; color: {stat.color};"
						>
							<span class="text-2xl font-black leading-none">{stat.count}</span>
							<span class="text-[10px] font-bold mt-1">{stat.label}</span>
							<span class="text-sm mt-1">{stat.icon}</span>
						</div>
					{/each}
				</div>

				<!-- ALL GUESTS -->
				<div class="px-4 mt-8">
					<h2 class="font-bold text-gray-900 text-lg">Lista de Invitados</h2>
					<div class="mt-4 space-y-3">
						{#if invitados.length === 0 && !loadingData}
							<p class="text-center text-slate-500 font-montserrat text-sm mt-8">Aun no hay confirmaciones.</p>
						{/if}
						{#each invitados as inv}
							<div class="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
								<div class="flex items-center gap-3">
									<div class="w-11 h-11 rounded-full overflow-hidden shadow-inner flex-shrink-0">
										<img
											src={`https://ui-avatars.com/api/?name=${encodeURIComponent(inv.nombre || 'A')}&background=random&bold=true`}
											alt={inv.nombre}
											class="w-full h-full object-cover"
										/>
									</div>
									<div>
										<p class="font-bold text-gray-900 text-sm">{inv.nombre}</p>
										<p class="text-[11px] text-gray-500 mt-0.5">{inv.personas} {Number(inv.personas) === 1 ? 'persona' : 'personas'}</p>
									</div>
								</div>
								<div class="flex flex-col items-end gap-1">
									{#if inv.asistencia === 'si'}
										<span class="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-[11px] font-bold">Si ✓</span>
									{:else if inv.asistencia === 'no'}
										<span class="bg-red-100 text-red-700 px-3 py-1 rounded-xl text-[11px] font-bold">No ✗</span>
									{:else}
										<span class="bg-gray-200 text-gray-600 px-3 py-1 rounded-xl text-[11px] font-bold">Pendiente</span>
									{/if}
									<span class="text-[9px] text-gray-400">{inv.fecha ? inv.fecha.split(',')[0] : 'Hoy'}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>

			{:else if currentTab === 'invitados'}
				<!-- CONFIRMED GUESTS ONLY -->
				<div class="px-4 mt-6">
					<div class="flex gap-2 mb-4">
						<span class="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-xs font-bold">{confirmados.length} Confirman</span>
						<span class="bg-red-100 text-red-700 px-3 py-1 rounded-xl text-xs font-bold">{noAsisten.length} No asisten</span>
					</div>
					<h2 class="font-bold text-gray-900 text-lg mb-4">Invitados que confirmaron</h2>
					{#if confirmados.length === 0}
						<p class="text-center text-slate-500 font-montserrat text-sm mt-8">Nadie ha confirmado aun.</p>
					{/if}
					{#each confirmados as inv}
						<div class="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mb-3">
							<div class="flex items-center gap-3">
								<div class="w-11 h-11 rounded-full overflow-hidden shadow-inner flex-shrink-0">
									<img
										src={`https://ui-avatars.com/api/?name=${encodeURIComponent(inv.nombre || 'A')}&background=random&bold=true`}
										alt={inv.nombre}
										class="w-full h-full object-cover"
									/>
								</div>
								<div>
									<p class="font-bold text-gray-900 text-sm">{inv.nombre}</p>
									<p class="text-[11px] text-gray-500 mt-0.5">{inv.personas} {Number(inv.personas) === 1 ? 'persona' : 'personas'}</p>
								</div>
							</div>
							<span class="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-[11px] font-bold">Si ✓</span>
						</div>
					{/each}
				</div>

			{:else if currentTab === 'ajustes'}
				<!-- SETTINGS -->
				<div class="px-4 mt-6">
					<h2 class="font-bold text-gray-900 text-lg mb-6">Ajustes</h2>
					<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
						<div class="flex items-center justify-between">
							<div>
								<p class="font-semibold text-gray-900 text-sm">Cerrar sesion</p>
								<p class="text-xs text-gray-500 mt-0.5">Salir del panel administrativo</p>
							</div>
							<button onclick={logout} class="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-200 transition-colors">
								Salir
							</button>
						</div>
					</div>
				</div>
			{/if}
		</main>

		<!-- BOTÓN FLOTANTE DESCARGAR -->
		<div class="absolute bottom-[4.5rem] left-0 right-0 px-4 pointer-events-none z-20">
			<button 
				onclick={handleDownloadCSV}
				class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3.5 flex justify-center items-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.4)] transition-all pointer-events-auto active:scale-95">
				Descargar CSV completo ↓
			</button>
		</div>

		<!-- BOTTOM NAV -->
		<nav class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center pt-2 pb-5 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex-shrink-0">
			<button onclick={() => currentTab = 'dashboard'} class="flex flex-col items-center {currentTab === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}">
				<span class="text-xl">◆</span>
				<span class="text-[10px] font-bold mt-0.5">Dashboard</span>
			</button>
			<button onclick={() => currentTab = 'invitados'} class="flex flex-col items-center {currentTab === 'invitados' ? 'text-blue-600' : 'text-gray-400'}">
				<span class="text-xl">◈</span>
				<span class="text-[10px] font-medium mt-0.5">Invitados</span>
			</button>
			<button onclick={() => currentTab = 'ajustes'} class="flex flex-col items-center {currentTab === 'ajustes' ? 'text-blue-600' : 'text-gray-400'}">
				<span class="text-xl">⚙</span>
				<span class="text-[10px] font-medium mt-0.5">Ajustes</span>
			</button>
		</nav>

	</div>
{/if}
