"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Satellite, BarChart3, Leaf, Target, Shield, Zap, ChevronRight, Menu, X, LogOut, UserIcon } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import type { User } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "login" | "register" }>({
    isOpen: false,
    mode: "login",
  })
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Carregar usuário do localStorage ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem("agrotrace_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleAuthSuccess = (userData: User) => {
    setUser(userData)
    localStorage.setItem("agrotrace_user", JSON.stringify(userData))
    // Redirecionar para o dashboard interno
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("agrotrace_user")
  }

  const openAuthModal = (mode: "login" | "register") => {
    setAuthModal({ isOpen: true, mode })
  }

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: "login" })
  }

  const handleDashboardAccess = () => {
    if (user) {
      router.push("/dashboard")
    } else {
      openAuthModal("login")
    }
  }

  const handleDashboard2Access = () => {
    if (user) {
      router.push("/dashboard2")
    } else {
      openAuthModal("login")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Satellite className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                AgroTrace
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                Recursos
              </a>
              <a href="#technology" className="text-gray-700 hover:text-green-600 transition-colors">
                Tecnologia
              </a>
              <a href="#benefits" className="text-gray-700 hover:text-green-600 transition-colors">
                Benefícios
              </a>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm">Olá, {user.name.split(" ")[0]}</span>
                  </div>
                  <Button
                    onClick={handleDashboardAccess}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDashboard2Access}
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  >
                    Dashboard 2
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => openAuthModal("login")}
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => openAuthModal("register")}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    Registre-se
                  </Button>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 mt-4">
                <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                  Recursos
                </a>
                <a href="#technology" className="text-gray-700 hover:text-green-600 transition-colors">
                  Tecnologia
                </a>
                <a href="#benefits" className="text-gray-700 hover:text-green-600 transition-colors">
                  Benefícios
                </a>

                {user ? (
                  <div className="flex flex-col space-y-2 pt-4">
                    <div className="flex items-center space-x-2 text-gray-700 mb-2">
                      <UserIcon className="w-4 h-4" />
                      <span className="text-sm">Olá, {user.name.split(" ")[0]}</span>
                    </div>
                    <Button
                      onClick={handleDashboardAccess}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleDashboard2Access}
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      Dashboard 2
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => openAuthModal("login")}
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => openAuthModal("register")}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Registre-se
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
            <Satellite className="w-4 h-4 mr-2" />
            Tecnologia Satelital Avançada
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Revolucione sua
            <br />
            <span className="text-green-800">Agricultura</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Análise inteligente de fazendas usando filtros multiespectrais com tecnologia satelital. Monitore, analise e
            otimize sua produção agrícola com precisão científica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {user ? (
              <Button
                size="lg"
                onClick={handleDashboardAccess}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Acessar Dashboard
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => openAuthModal("register")}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Comece Agora
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => openAuthModal("login")}
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-lg px-8 py-6 rounded-xl transition-all duration-300"
                >
                  Fazer Login
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Recursos Avançados</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnologia de ponta para análise agrícola com precisão e eficiência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Satellite className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Análise Satelital</h3>
                <p className="text-gray-600 leading-relaxed">
                  Imagens de alta resolução com filtros multiespectrais para monitoramento preciso da vegetação e solo.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Relatórios Inteligentes</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dashboards interativos com análises detalhadas e insights acionáveis para tomada de decisão.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Precisão Científica</h3>
                <p className="text-gray-600 leading-relaxed">
                  Algoritmos avançados de machine learning para detecção precoce de problemas e otimização de recursos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
                <Zap className="w-4 h-4 mr-2" />
                Inovação Tecnológica
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Filtros Multiespectrais
                <span className="block text-green-600">de Última Geração</span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Nossa tecnologia utiliza sensores avançados que capturam dados em múltiplas bandas espectrais, revelando
                informações invisíveis ao olho humano sobre a saúde das plantas, umidade do solo e muito mais.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Monitoramento em tempo real</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Análise de índices de vegetação</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Detecção de estresse hídrico</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Mapeamento de produtividade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Benefícios Comprovados</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Resultados reais que transformam a gestão agrícola
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-green-300" />
              </div>
              <h3 className="text-3xl font-bold mb-2">+25%</h3>
              <p className="text-green-100">Aumento na Produtividade</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-blue-300" />
              </div>
              <h3 className="text-3xl font-bold mb-2">-30%</h3>
              <p className="text-green-100">Redução de Perdas</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-purple-300" />
              </div>
              <h3 className="text-3xl font-bold mb-2">95%</h3>
              <p className="text-green-100">Precisão nas Análises</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-yellow-300" />
              </div>
              <h3 className="text-3xl font-bold mb-2">-40%</h3>
              <p className="text-green-100">Economia de Recursos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Pronto para Revolucionar sua Fazenda?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de produtores que já transformaram sua agricultura com a AgroTrace
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Button
                size="lg"
                onClick={handleDashboardAccess}
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Acessar Dashboard
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => openAuthModal("register")}
                  className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Começar Gratuitamente
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => openAuthModal("login")}
                  className="border-2 border-white text-green-600 hover:bg-white hover:text-green-600 text-lg px-8 py-6 rounded-xl transition-all duration-300"
                >
                  Já tenho conta
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Satellite className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AgroTrace</span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2024 AgroTrace. Transformando a agricultura com tecnologia satelital.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}
