import { NextRequest, NextResponse } from "next/server"

// NÃO use NEXT_PUBLIC_ para secret keys
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY 

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")

    if (!lat || !lon) {
        return NextResponse.json(
            { error: "Latitude e longitude são obrigatórias" },
            { status: 400 }
        )
    }

    try {
        console.log(`⛅ Buscando previsão para lat=${lat}, lon=${lon}`)

        // Busca a previsão dos próximos 5 dias
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`,
            {
                headers: { "User-Agent": "AgroTrace/1.0" },
                signal: AbortSignal.timeout(10000)
            }
        )

        if (!response.ok) {
            throw new Error(`Erro na API OpenWeather: ${response.status}`)
        }

        const data = await response.json()

        // Encontra o primeiro horário que tenha previsão de chuva
        const chuva = data.list.find((item: any) => {
            const main = item.weather[0].main
            const rainAmount = item.rain?.["3h"] || 0
            return main === "Rain" || rainAmount > 0
        })

        // Caso não haja chuva prevista
        if (!chuva) {
            return NextResponse.json({
                vaiChover: false,
                mensagem: "Não há previsão de chuva nos próximos dias."
            })
        }

        // Dados da chuva encontrada
        const dataHora = chuva.dt_txt
        const descricao = chuva.weather[0].description

        return NextResponse.json({
            vaiChover: true,
            data: dataHora,
            descricao,
            mensagem: `Existe previsão de chuva em ${dataHora}. Caso ocorra a precipitação faça a análise novamente.`
        })

    } catch (error) {
        console.error("❌ Erro ao consultar clima:", error)
        return NextResponse.json(
            { error: "Erro ao consultar o clima", details: (error as Error).message },
            { status: 500 }
        )
    }
}
