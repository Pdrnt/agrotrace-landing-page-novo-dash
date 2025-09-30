"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Satellite,
  BarChart3,
  Home,
  Maximize2,
  Minimize2,
  RefreshCw,
  LogOut,
  UserIcon,
  Info,
  Layers,
  Database,
  Code,
  Cpu,
  Filter,
  Workflow,
  Zap,
} from "lucide-react"
import type { User } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem("agrotrace_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Redirecionar para home se não estiver logado
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("agrotrace_user")
    router.push("/")
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simular reload do iframe
    const iframe = document.getElementById("dashboard-iframe") as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Satellite className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  AgroTrace
                </span>
              </div>
              <Badge className="bg-green-100 text-green-800">Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>

              <div className="flex items-center space-x-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>

              <Button variant="outline" onClick={handleLogout} className="border-red-300 text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-6">
        {!isFullscreen && (
          <>
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo ao AgroTrace</h1>
              <p className="text-gray-600">
                Plataforma de análise agrícola baseada em imagens multiespectrais do Sentinel Hub
              </p>
            </div>

            {/* Technology Overview */}
            <Tabs defaultValue="technology" className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="technology">Tecnologia</TabsTrigger>
                <TabsTrigger value="parameters">Parâmetros</TabsTrigger>
                <TabsTrigger value="sentinel">Sentinel Hub</TabsTrigger>
                <TabsTrigger value="ai">Inteligência Artificial</TabsTrigger>
              </TabsList>

              <TabsContent value="technology" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Satellite className="w-5 h-5 mr-2 text-green-600" />
                      Tecnologia Multiespectral
                    </CardTitle>
                    <CardDescription>
                      Entenda como funciona a tecnologia por trás da análise de imagens multiespectrais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <Layers className="w-4 h-4 mr-2 text-green-600" />
                          Bandas Espectrais
                        </h3>
                        <p className="text-gray-600 mb-4">
                          As imagens multiespectrais capturam dados em várias bandas do espectro eletromagnético,
                          incluindo luz visível e invisível (infravermelho, ultravioleta).
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span>
                              <strong>Banda Azul (B2):</strong> 458-523nm - Penetração em água, solo e vegetação
                            </span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span>
                              <strong>Banda Verde (B3):</strong> 543-578nm - Reflectância de vegetação saudável
                            </span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span>
                              <strong>Banda Vermelha (B4):</strong> 650-680nm - Absorção de clorofila
                            </span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                            <span>
                              <strong>Infravermelho Próximo (B8):</strong> 785-900nm - Biomassa e vigor da vegetação
                            </span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                            <span>
                              <strong>SWIR (B11, B12):</strong> 1565-2280nm - Umidade do solo e vegetação
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <Filter className="w-4 h-4 mr-2 text-green-600" />
                          Índices de Vegetação
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Combinações matemáticas de bandas espectrais que destacam propriedades específicas da
                          vegetação e do solo.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="w-3 h-3 rounded-full bg-green-600 mr-2 mt-1"></div>
                            <div>
                              <strong>NDVI (Índice de Vegetação por Diferença Normalizada):</strong>
                              <p className="text-gray-500">
                                (NIR - Red) / (NIR + Red) - Mede a saúde e densidade da vegetação
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-3 h-3 rounded-full bg-blue-600 mr-2 mt-1"></div>
                            <div>
                              <strong>NDWI (Índice de Água por Diferença Normalizada):</strong>
                              <p className="text-gray-500">
                                (Green - NIR) / (Green + NIR) - Identifica conteúdo de água na vegetação
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-3 h-3 rounded-full bg-amber-600 mr-2 mt-1"></div>
                            <div>
                              <strong>SAVI (Índice de Vegetação Ajustado ao Solo):</strong>
                              <p className="text-gray-500">
                                ((NIR - Red) / (NIR + Red + L)) * (1 + L) - Minimiza influências do solo
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="parameters" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Workflow className="w-5 h-5 mr-2 text-green-600" />
                      Parâmetros de Análise
                    </CardTitle>
                    <CardDescription>
                      Parâmetros utilizados pelo AgroTrace para análise de imagens multiespectrais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Parâmetros de Aquisição</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold text-green-800">1</span>
                            </div>
                            <div>
                              <strong className="text-gray-800">Resolução Espacial:</strong>
                              <p className="text-gray-600 text-sm">
                                10m, 20m e 60m (dependendo da banda) - Define o nível de detalhe das imagens
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold text-green-800">2</span>
                            </div>
                            <div>
                              <strong className="text-gray-800">Resolução Temporal:</strong>
                              <p className="text-gray-600 text-sm">
                                Revisita de 5 dias - Frequência com que novas imagens são capturadas
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold text-green-800">3</span>
                            </div>
                            <div>
                              <strong className="text-gray-800">Cobertura de Nuvens:</strong>
                              <p className="text-gray-600 text-sm">
                                Filtro &lt;20% - Limita a análise a imagens com baixa cobertura de nuvens
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold text-green-800">4</span>
                            </div>
                            <div>
                              <strong className="text-gray-800">Ângulo de Incidência:</strong>
                              <p className="text-gray-600 text-sm">
                                Preferência por ângulos &lt;10° - Minimiza distorções geométricas
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Parâmetros de Processamento</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold text-blue-800">1</span>
                            </div>
                            <div>
                              <strong className="text-gray-800">Correção Atmosférica:</strong>
                              <p className="text-gray-600 text-sm">
                                Método Sen2Cor - Remove efeitos atmosféricos das imagens
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold text-blue-800">2</span>
                            </div>
                            <div>
                              <strong className="text-gray-800">Normalização Radiométrica:</strong>
                              <p className="text-gray-600 text-sm">
                                Conversão para reflectância de superfície - Padroniza valores entre imagens
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold text-blue-800">3</span>
                            </div>
                            <div>
                              <strong className="text-gray-800">Limites de Detecção:</strong>
                              <p className="text-gray-600 text-sm">
                                NDVI: 0.2-0.9 para vegetação saudável - Define faixas de interpretação
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-xs font-bold text-blue-800">4</span>
                            </div>
                            <div>
                              <strong className="text-gray-800">Segmentação:</strong>
                              <p className="text-gray-600 text-sm">
                                Algoritmo SLIC - Divide a imagem em regiões homogêneas para análise
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sentinel" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="w-5 h-5 mr-2 text-green-600" />
                      Integração com Sentinel Hub
                    </CardTitle>
                    <CardDescription>
                      Como o AgroTrace utiliza a API do Sentinel Hub para obter e processar imagens de satélite
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Sobre o Sentinel Hub</h3>
                        <p className="text-gray-600 mb-4">
                          O Sentinel Hub é uma plataforma de processamento de dados de observação da Terra que fornece
                          acesso a imagens de satélite de várias missões, incluindo o Sentinel-2 da Agência Espacial
                          Europeia (ESA).
                        </p>

                        <h4 className="font-medium text-gray-800 mb-2">Principais características:</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 mt-1.5"></div>
                            <span>
                              Acesso a dados de satélite atualizados regularmente (Sentinel-2, Landsat, MODIS, etc.)
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 mt-1.5"></div>
                            <span>
                              Processamento de imagens em nuvem, eliminando a necessidade de download de dados
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 mt-1.5"></div>
                            <span>
                              API RESTful para integração com aplicações como o AgroTrace, permitindo consultas
                              personalizadas
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 mt-1.5"></div>
                            <span>
                              Suporte a visualizações personalizadas e cálculo de índices espectrais em tempo real
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Fluxo de Integração</h3>
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                          <ol className="space-y-4">
                            <li className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-green-800">1</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">Requisição de Dados</h4>
                                <p className="text-sm text-gray-600">
                                  O AgroTrace envia requisições à API do Sentinel Hub especificando coordenadas
                                  geográficas, intervalo de datas e bandas espectrais desejadas.
                                </p>
                              </div>
                            </li>
                            <li className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-green-800">2</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">Processamento em Nuvem</h4>
                                <p className="text-sm text-gray-600">
                                  O Sentinel Hub processa as imagens em seus servidores, aplicando correções e
                                  calculando índices espectrais conforme solicitado.
                                </p>
                              </div>
                            </li>
                            <li className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-green-800">3</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">Retorno de Dados</h4>
                                <p className="text-sm text-gray-600">
                                  Os dados processados são retornados ao AgroTrace em formato GeoTIFF ou JSON para
                                  análise adicional pelo nosso algoritmo de IA.
                                </p>
                              </div>
                            </li>
                            <li className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-green-800">4</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">Análise e Visualização</h4>
                                <p className="text-sm text-gray-600">
                                  O AgroTrace processa os dados com algoritmos proprietários e apresenta os resultados
                                  no dashboard interativo.
                                </p>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cpu className="w-5 h-5 mr-2 text-green-600" />
                      Inteligência Artificial
                    </CardTitle>
                    <CardDescription>Como a IA do AgroTrace analisa e interpreta dados multiespectrais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Arquitetura de IA</h3>
                        <p className="text-gray-600 mb-4">
                          O AgroTrace utiliza uma combinação de redes neurais convolucionais (CNN) e algoritmos de
                          aprendizado de máquina para analisar imagens multiespectrais e detectar padrões relevantes
                          para a agricultura.
                        </p>

                        <div className="space-y-4">
                          <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-medium text-gray-800">Redes Neurais Convolucionais</h4>
                            <p className="text-sm text-gray-600">
                              Arquitetura U-Net modificada para segmentação semântica de imagens multiespectrais,
                              identificando diferentes tipos de culturas, áreas de estresse e características do solo.
                            </p>
                          </div>

                          <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-medium text-gray-800">Séries Temporais</h4>
                            <p className="text-sm text-gray-600">
                              Modelos LSTM (Long Short-Term Memory) para análise de mudanças ao longo do tempo,
                              permitindo detecção precoce de problemas e previsão de desenvolvimento das culturas.
                            </p>
                          </div>

                          <div className="border-l-4 border-purple-500 pl-4">
                            <h4 className="font-medium text-gray-800">Classificação e Detecção</h4>
                            <p className="text-sm text-gray-600">
                              Algoritmos de Random Forest e SVM (Support Vector Machines) para classificação de áreas e
                              detecção de anomalias com base em múltiplos índices espectrais.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Capacidades Analíticas</h3>
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <Zap className="w-4 h-4 text-green-600" />
                              </div>
                              <h4 className="font-medium text-gray-800">Detecção de Estresse</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              Identifica áreas com estresse hídrico, deficiências nutricionais ou doenças antes que
                              sejam visíveis a olho nu, usando padrões espectrais específicos.
                            </p>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <Filter className="w-4 h-4 text-blue-600" />
                              </div>
                              <h4 className="font-medium text-gray-800">Mapeamento de Variabilidade</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              Cria mapas detalhados de variabilidade do solo e das culturas para aplicação de insumos em
                              taxa variável, otimizando o uso de recursos.
                            </p>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                <BarChart3 className="w-4 h-4 text-amber-600" />
                              </div>
                              <h4 className="font-medium text-gray-800">Previsão de Produtividade</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              Estima o potencial produtivo de diferentes áreas com base em dados históricos e condições
                              atuais, permitindo melhor planejamento de colheita.
                            </p>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                <Code className="w-4 h-4 text-purple-600" />
                              </div>
                              <h4 className="font-medium text-gray-800">Aprendizado Contínuo</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              O sistema melhora continuamente com novos dados, adaptando-se às condições específicas de
                              cada propriedade e região para aumentar a precisão das análises.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Main Dashboard Container */}
        <Card className={`${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "mb-6"}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>Painel de Análise Multiespectral</span>
            </CardTitle>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} className="border-gray-300">
                <RefreshCw className="w-4 h-4" />
              </Button>

              <Button variant="outline" size="sm" onClick={toggleFullscreen} className="border-gray-300">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div
              className={`relative ${isFullscreen ? "h-screen" : "h-[800px]"} bg-gray-100 rounded-b-lg overflow-hidden`}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando dashboard...</p>
                  </div>
                </div>
              )}

              <iframe
                id="dashboard-iframe"
                src="https://v0-agrotrace-dashboard.vercel.app/"
                className="w-full h-full border-0"
                title="AgroTrace Dashboard"
                onLoad={() => setIsLoading(false)}
                allow="geolocation; camera; microphone; fullscreen"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-geolocation"
              />
            </div>
          </CardContent>
        </Card>

        {!isFullscreen && (
          <>
            {/* Documentation Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-green-600" />
                  Documentação e Recursos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <Satellite className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="font-medium">Guia de Interpretação</span>
                    <span className="text-xs text-gray-500 mt-1">Entenda os mapas e índices</span>
                  </Button>

                  <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <Code className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="font-medium">API Documentation</span>
                    <span className="text-xs text-gray-500 mt-1">Integre com seus sistemas</span>
                  </Button>

                  <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <Workflow className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="font-medium">Melhores Práticas</span>
                    <span className="text-xs text-gray-500 mt-1">Otimize sua análise</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Footer Info */}
            <div className="text-center text-gray-500 text-sm">
              <p>© 2024 AgroTrace - Tecnologia Satelital para Agricultura de Precisão</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
