"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
	Leaf,
	Droplet,
	Thermometer,
	AlertTriangle,
	Sun,
	CloudSun,
	Download,
	Calendar,
	Bell,
	Settings,
	Plus,
	MapPin,
	User as UserIcon,
	Upload,
} from "lucide-react"

export default function Dashboard2Page() {
		type Field = { id: string; name: string; area: string; crop: string; status: "success" | "warning" | "error" }
		const [activeTab, setActiveTab] = useState<"dashboard" | "analises" | "campos" | "relatorios" | "config">(
			"dashboard",
		)
		const [fields, setFields] = useState<Field[]>([
			{ id: "1", name: "Campo Norte", area: "25.5 ha", crop: "Soja", status: "success" },
			{ id: "2", name: "Campo Sul", area: "18.2 ha", crop: "Milho", status: "warning" },
			{ id: "3", name: "Campo Leste", area: "32.1 ha", crop: "Algodão", status: "error" },
		])
		const [selectedFieldId, setSelectedFieldId] = useState<string>("1")
		const [addOpen, setAddOpen] = useState(false)
		const [newName, setNewName] = useState("")
		const [newArea, setNewArea] = useState("")
		const [newCrop, setNewCrop] = useState("Soja")
		const [newStatus, setNewStatus] = useState<Field["status"]>("success")

		const activeField = fields.find((f) => f.id === selectedFieldId) || fields[0]

		const addField = () => {
			if (!newName || !newArea) return
			const id = Date.now().toString()
			setFields((prev) => [...prev, { id, name: newName, area: newArea, crop: newCrop, status: newStatus }])
			setSelectedFieldId(id)
			setAddOpen(false)
			setNewName("")
			setNewArea("")
		}

		return (
		<div className="min-h-screen bg-slate-50">
			{/* Top bar */}
			<header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
				<div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-9 w-9 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white grid place-items-center">
							<Leaf className="h-5 w-5" />
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
							AgroTrace
						</span>
						<Badge className="ml-2 bg-green-100 text-green-800">Sistema Ativo</Badge>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon">
							<Bell className="h-5 w-5 text-slate-600" />
						</Button>
						<div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-slate-700">
							<UserIcon className="h-4 w-4" />
							<span className="text-sm font-medium">Produtor Rural</span>
						</div>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
				{/* Sidebar */}
						<aside className="col-span-12 md:col-span-3 lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-sm text-slate-500">Menu</CardTitle>
						</CardHeader>
						<CardContent className="space-y-1">
									<SidebarItem
										active={activeTab === "dashboard"}
										icon={<Leaf className="h-4 w-4" />}
										onClick={() => setActiveTab("dashboard")}
									>
										Dashboard
									</SidebarItem>
									<SidebarItem
										active={activeTab === "analises"}
										icon={<Upload className="h-4 w-4" />}
										onClick={() => setActiveTab("analises")}
									>
										Análises
									</SidebarItem>
									<SidebarItem
										active={activeTab === "campos"}
										icon={<MapPin className="h-4 w-4" />}
										onClick={() => setActiveTab("campos")}
									>
										Campos
									</SidebarItem>
									<SidebarItem
										active={activeTab === "relatorios"}
										icon={<Calendar className="h-4 w-4" />}
										onClick={() => setActiveTab("relatorios")}
									>
										Relatórios
									</SidebarItem>
									<SidebarItem
										active={activeTab === "config"}
										icon={<Settings className="h-4 w-4" />}
										onClick={() => setActiveTab("config")}
									>
										Configurações
									</SidebarItem>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-3 flex-row items-center justify-between">
							<CardTitle className="text-sm">Meus Campos</CardTitle>
									<Button size="icon" variant="outline" className="h-7 w-7" onClick={() => setAddOpen(true)}>
								<Plus className="h-4 w-4" />
							</Button>
						</CardHeader>
						<CardContent className="space-y-3">
									{fields.map((f) => (
										<FieldItem
											key={f.id}
											name={f.name}
											area={`${f.area} • ${f.crop}`}
											status={f.status}
											active={selectedFieldId === f.id}
											onClick={() => {
												setSelectedFieldId(f.id)
												setActiveTab("dashboard")
											}}
										/>
									))}
						</CardContent>
					</Card>

							{/* Add Field Dialog */}
							<Dialog open={addOpen} onOpenChange={setAddOpen}>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Novo Campo</DialogTitle>
									</DialogHeader>
									<div className="space-y-4 py-2">
										<div className="grid gap-2">
											<Label htmlFor="name">Nome</Label>
											<Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ex.: Campo Oeste" />
										</div>
										<div className="grid gap-2">
											<Label htmlFor="area">Área</Label>
											<Input id="area" value={newArea} onChange={(e) => setNewArea(e.target.value)} placeholder="Ex.: 20 ha" />
										</div>
										<div className="grid gap-2">
											<Label>Cultura</Label>
											<Select value={newCrop} onValueChange={setNewCrop}>
												<SelectTrigger>
													<SelectValue placeholder="Selecione" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Soja">Soja</SelectItem>
													<SelectItem value="Milho">Milho</SelectItem>
													<SelectItem value="Algodão">Algodão</SelectItem>
													<SelectItem value="Cana">Cana</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid gap-2">
											<Label>Status</Label>
											<Select value={newStatus} onValueChange={(v) => setNewStatus(v as Field["status"])}>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="success">Saudável</SelectItem>
													<SelectItem value="warning">Atenção</SelectItem>
													<SelectItem value="error">Crítico</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									<DialogFooter>
										<Button variant="outline" onClick={() => setAddOpen(false)}>
											Cancelar
										</Button>
										<Button onClick={addField}>Adicionar</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
				</aside>

						{/* Main */}
						<main className="col-span-12 md:col-span-9 lg:col-span-7 space-y-6">
							{activeTab === "dashboard" && (
								<>
									<div>
										<h1 className="text-2xl md:text-3xl font-bold text-slate-800">Bem-vindo, sad! 👋</h1>
										<p className="text-slate-500">Aqui está um resumo da sua fazenda hoje, 01/11/2025</p>
									</div>

									{/* KPI cards */}
									<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
										<StatCard title="Saúde Geral" value="85%" delta="+5% esta semana" icon={<Leaf className="h-4 w-4" />} />
										<StatCard
											title="Irrigação"
											value="72%"
											delta="↘ -8% esta semana"
											color="blue"
											icon={<Droplet className="h-4 w-4" />}
										/>
										<StatCard
											title="Temperatura"
											value="28°C"
											hint="Ideal para cultivo"
											color="orange"
											icon={<Thermometer className="h-4 w-4" />}
										/>
										<StatCard
											title="Alertas"
											value="3"
											hint="Requer atenção"
											color="rose"
											icon={<AlertTriangle className="h-4 w-4" />}
										/>
									</div>

									{/* Field panel */}
									<Card>
										<CardHeader className="flex-row items-center justify-between space-y-0">
											<div>
												<CardTitle className="flex items-center gap-2">
													<span className="h-2 w-2 rounded-full bg-green-500" /> {activeField.name}
												</CardTitle>
												<CardDescription>
													{activeField.area} • {activeField.crop} • Última análise: 2 horas atrás
												</CardDescription>
											</div>
											<div className="flex items-center gap-2">
												<Button variant="outline" size="sm">
													Nova Análise
												</Button>
												<Button variant="outline" size="icon" className="h-9 w-9">
													<Download className="h-4 w-4" />
												</Button>
											</div>
										</CardHeader>
										<CardContent>
											<div className="aspect-[16/7] rounded-lg border bg-gradient-to-b from-slate-50 to-slate-100 grid place-items-center text-slate-400">
												<span>Mapa/Imagem multiespectral (placeholder)</span>
											</div>

											<div className="mt-4 grid gap-4 sm:grid-cols-3">
												<Bar label="Saúde da Planta" value={92} color="green" />
												<Bar label="Irrigação" value={78} color="blue" />
												<Bar label="Crescimento" value={85} color="emerald" />
											</div>

											<div className="mt-6">
												<h3 className="font-semibold text-slate-800 mb-2">Insights da IA</h3>
												<ul className="space-y-2 text-sm text-slate-600">
													<li>• Recomenda-se aumentar irrigação em 15% na área nordeste</li>
													<li>• Previsão de colheita: 18-22 de março (95% de confiança)</li>
													<li>• Detectado estresse hídrico leve na zona central</li>
													<li>• Aplicação de fertilizante recomendada para setor sul</li>
												</ul>
											</div>
										</CardContent>
									</Card>
								</>
							)}

							{activeTab === "analises" && (
								<Card>
									<CardHeader>
										<CardTitle>Análise Temporal</CardTitle>
										<CardDescription>Evolução dos indicadores nos últimos 30 dias</CardDescription>
									</CardHeader>
									<CardContent>
										<Tabs defaultValue="saude">
											<TabsList className="grid w-full grid-cols-3">
												<TabsTrigger value="saude">Saúde</TabsTrigger>
												<TabsTrigger value="irrigacao">Irrigação</TabsTrigger>
												<TabsTrigger value="crescimento">Crescimento</TabsTrigger>
											</TabsList>
											<TabsContent value="saude">
												<div className="mt-4 h-56 rounded-md bg-green-50 grid place-items-center text-green-700">
													Gráfico de Saúde da Planta (placeholder)
												</div>
											</TabsContent>
											<TabsContent value="irrigacao">
												<div className="mt-4 h-56 rounded-md bg-blue-50 grid place-items-center text-blue-700">
													Gráfico de Irrigação (placeholder)
												</div>
											</TabsContent>
											<TabsContent value="crescimento">
												<div className="mt-4 h-56 rounded-md bg-emerald-50 grid place-items-center text-emerald-700">
													Gráfico de Crescimento (placeholder)
												</div>
											</TabsContent>
										</Tabs>
									</CardContent>
								</Card>
							)}

							{activeTab === "campos" && (
								<Card>
									<CardHeader>
										<CardTitle>Gestão de Campos</CardTitle>
										<CardDescription>Adicione, selecione e gerencie seus campos</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<div className="grid gap-3 sm:grid-cols-2">
											{fields.map((f) => (
												<div key={f.id} className="rounded-md border p-3">
													<div className="flex items-center justify-between">
														<div>
															<div className="font-medium">{f.name}</div>
															<div className="text-xs text-slate-500">
																{f.area} • {f.crop}
															</div>
														</div>
														<Button size="sm" variant="outline" onClick={() => setSelectedFieldId(f.id)}>
															Selecionar
														</Button>
													</div>
												</div>
											))}
										</div>
										<Button onClick={() => setAddOpen(true)}>Adicionar Campo</Button>
									</CardContent>
								</Card>
							)}

							{activeTab === "relatorios" && (
								<Card>
									<CardHeader>
										<CardTitle>Relatórios</CardTitle>
										<CardDescription>Gere e baixe relatórios das suas análises</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<Button variant="outline" className="justify-start w-full">
											<Download className="mr-2 h-4 w-4" /> Baixar Relatório PDF
										</Button>
										<Button variant="outline" className="justify-start w-full">
											<Download className="mr-2 h-4 w-4" /> Exportar CSV
										</Button>
									</CardContent>
								</Card>
							)}

							{activeTab === "config" && (
								<Card>
									<CardHeader>
										<CardTitle>Configurações</CardTitle>
										<CardDescription>Preferências do sistema</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<div className="font-medium">Notificações</div>
												<div className="text-xs text-slate-500">Receber alertas por e-mail</div>
											</div>
											<Switch defaultChecked />
										</div>
										<div className="flex items-center justify-between">
											<div>
												<div className="font-medium">Modo Econômico</div>
												<div className="text-xs text-slate-500">Reduz processamento de análises</div>
											</div>
											<Switch />
										</div>
									</CardContent>
								</Card>
							)}
						</main>

				{/* Right rail */}
				<aside className="col-span-12 lg:col-span-3 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CloudSun className="h-5 w-5 text-amber-500" /> Clima
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="text-center">
								<div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-amber-50">
									<Sun className="h-7 w-7 text-amber-500" />
								</div>
								<div className="text-3xl font-bold">28°C</div>
								<div className="text-xs text-slate-500">Ensolarado</div>
							</div>
							<div className="grid grid-cols-2 gap-3 text-sm">
								<div className="rounded-md bg-slate-50 p-3">
									<div className="text-slate-500">Umidade</div>
									<div className="font-medium">65%</div>
								</div>
								<div className="rounded-md bg-slate-50 p-3">
									<div className="text-slate-500">Vento</div>
									<div className="font-medium">12 km/h</div>
								</div>
								<div className="rounded-md bg-slate-50 p-3">
									<div className="text-slate-500">Chuva</div>
									<div className="font-medium">15%</div>
								</div>
								<div className="rounded-md bg-slate-50 p-3">
									<div className="text-slate-500">UV</div>
									<div className="font-medium">Alto</div>
								</div>
							</div>
							<div>
								<div className="text-sm font-medium mb-2">Próximos 5 dias</div>
								<div className="space-y-2 text-sm text-slate-600">
									<div className="flex items-center justify-between"><span>Hoje</span><span>28°C</span></div>
									<div className="flex items-center justify-between"><span>Amanhã</span><span>26°C</span></div>
									<div className="flex items-center justify-between"><span>Quinta</span><span>24°C</span></div>
									<div className="flex items-center justify-between"><span>Sexta</span><span>27°C</span></div>
									<div className="flex items-center justify-between"><span>Sábado</span><span>29°C</span></div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<AlertTriangle className="h-5 w-5 text-rose-600" /> Alertas Recentes
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 text-sm">
							<AlertItem level="warning" title="Baixa Umidade Detectada" desc="Campo Sul apresenta níveis críticos de umidade" />
							<AlertItem level="error" title="Risco de Pragas" desc="Possível infestação detectada no Campo Norte" />
							<AlertItem level="info" title="Índice UV Alto" desc="Recomendada proteção adicional para trabalhadores" />
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Ações Rápidas</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button variant="outline" className="w-full justify-start">
								<Upload className="mr-2 h-4 w-4" /> Nova Análise
							</Button>
							<Button variant="outline" className="w-full justify-start">
								<Download className="mr-2 h-4 w-4" /> Baixar Relatório
							</Button>
							<Button variant="outline" className="w-full justify-start">
								<Calendar className="mr-2 h-4 w-4" /> Agendar Irrigação
							</Button>
							<Button variant="outline" className="w-full justify-start">
								<Settings className="mr-2 h-4 w-4" /> Configurar Alertas
							</Button>
						</CardContent>
					</Card>

								{/* App Mobile card removido conforme solicitado */}
				</aside>
			</div>
		</div>
	)
}

			function SidebarItem({
				children,
				icon,
				active = false,
				onClick,
			}: {
				children: React.ReactNode
				icon: React.ReactNode
				active?: boolean
				onClick?: () => void
			}) {
	return (
					<button
			className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
				active ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-50"
			}`}
						onClick={onClick}
		>
			<span className={`grid h-5 w-5 place-items-center rounded ${active ? "text-green-700" : "text-slate-500"}`}>{icon}</span>
			<span className="truncate text-left">{children}</span>
			{active ? <span className="ml-auto h-2 w-2 rounded-full bg-green-500" /> : null}
		</button>
	)
}

			function FieldItem({
				name,
				area,
				status,
				active = false,
				onClick,
			}: {
				name: string
				area: string
				status: "success" | "warning" | "error"
				active?: boolean
				onClick?: () => void
			}) {
	const color = status === "success" ? "bg-green-500" : status === "warning" ? "bg-amber-500" : "bg-rose-500"
	return (
					<button onClick={onClick} className={`w-full rounded-md border p-3 text-left ${active ? "bg-green-50" : "hover:bg-slate-50"}`}>
			<div className="flex items-center justify-between">
				<div>
					<div className="font-medium">{name}</div>
					<div className="text-xs text-slate-500">{area}</div>
				</div>
				<span className={`h-2.5 w-2.5 rounded-full ${color}`} />
			</div>
					</button>
	)
}

function StatCard({
	title,
	value,
	delta,
	hint,
	color = "green",
	icon,
}: {
	title: string
	value: string
	delta?: string
	hint?: string
	color?: "green" | "blue" | "orange" | "rose"
	icon: React.ReactNode
}) {
	const colorClasses: Record<string, string> = {
		green: "from-green-500 to-emerald-500",
		blue: "from-blue-500 to-cyan-500",
		orange: "from-amber-500 to-orange-500",
		rose: "from-rose-500 to-pink-500",
	}
	return (
		<Card className="group border-0 bg-gradient-to-br from-slate-50 to-white shadow-sm">
			<CardContent className="p-5">
				<div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
					{icon}
				</div>
				<div className="text-sm text-slate-600">{title}</div>
				<div className="mt-1 text-2xl font-bold text-slate-800">{value}</div>
				{delta ? <div className="text-xs text-slate-500">{delta}</div> : null}
				{hint ? <div className="text-xs text-slate-500">{hint}</div> : null}
			</CardContent>
		</Card>
	)
}

function Bar({ label, value, color = "green" }: { label: string; value: number; color?: "green" | "blue" | "emerald" }) {
	const barColor = color === "green" ? "bg-green-600" : color === "blue" ? "bg-blue-600" : "bg-emerald-600"
	return (
		<div>
			<div className="mb-2 flex items-center justify-between text-sm">
				<span className="text-slate-600">{label}</span>
				<span className="font-medium text-slate-800">{value}%</span>
			</div>
			<Progress value={value} className="h-2" />
				{/* visual hint de cor */}
				<div className={`pointer-events-none -mt-2 h-2 rounded bg-transparent ${barColor}`} style={{ opacity: 0 }} />
		</div>
	)
}

function AlertItem({ level, title, desc }: { level: "warning" | "error" | "info"; title: string; desc: string }) {
	const dot = level === "error" ? "bg-rose-500" : level === "warning" ? "bg-amber-500" : "bg-blue-500"
	return (
		<div className="rounded-md border p-3">
			<div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-800">
				<span className={`h-2.5 w-2.5 rounded-full ${dot}`} /> {title}
			</div>
			<div className="text-xs text-slate-500">{desc}</div>
		</div>
	)
}

