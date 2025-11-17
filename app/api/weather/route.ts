import { NextRequest, NextResponse } from "next/server"

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

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
        console.log(`🌤️ Consultando OpenWeather para lat=${lat}, lon=${lon}`)

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`,
            {
                headers: { "User-Agent": "AgroTrace/1.0" },
                signal: AbortSignal.timeout(10000), // timeout de 10s
            }
        )

        if (!response.ok) {
            throw new Error(`Erro na API OpenWeather: ${response.status}`)
        }

        const data = await response.json()

        const weather = {
            cidade: data.name,
            descricao: data.weather[0].description,
            temperatura: data.main.temp,
            sensacao: data.main.feels_like,
            minima: data.main.temp_min,
            maxima: data.main.temp_max,
            umidade: data.main.humidity,
            vento: data.wind.speed,
        }

        return NextResponse.json(weather)
    } catch (error) {
        console.error("❌ Erro ao buscar clima:", error)
        return NextResponse.json(
            { error: "Erro ao consultar o clima", details: (error as Error).message },
            { status: 500 }
        )
    }
}
