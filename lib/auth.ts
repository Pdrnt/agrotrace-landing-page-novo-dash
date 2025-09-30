import { ref, set, get } from "firebase/database"
import { database } from "./firebase"

// Função simples para hash da senha (em produção, use bcrypt ou similar)
function simpleHash(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    // Verificar se o email já existe
    const usersRef = ref(database, "users")
    const snapshot = await get(usersRef)

    if (snapshot.exists()) {
      const users = snapshot.val()
      const existingUser = Object.values(users).find((user: any) => user.email === email)

      if (existingUser) {
        return { success: false, message: "Email já cadastrado!" }
      }
    }

    // Criar novo usuário
    const userId = Date.now().toString()
    const hashedPassword = simpleHash(password)

    const newUser = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    }

    await set(ref(database, `users/${userId}`), newUser)

    // Retornar dados do usuário sem a senha
    const { password: _, ...userWithoutPassword } = newUser

    return {
      success: true,
      message: "Usuário cadastrado com sucesso!",
      user: userWithoutPassword as User,
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error)
    return { success: false, message: "Erro interno do servidor" }
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const usersRef = ref(database, "users")
    const snapshot = await get(usersRef)

    if (!snapshot.exists()) {
      return { success: false, message: "Email ou senha incorretos!" }
    }

    const users = snapshot.val()
    const hashedPassword = simpleHash(password)

    const user = Object.values(users).find(
      (user: any) => user.email === email && user.password === hashedPassword,
    ) as any

    if (!user) {
      return { success: false, message: "Email ou senha incorretos!" }
    }

    // Retornar dados do usuário sem a senha
    const { password: _, ...userWithoutPassword } = user

    return {
      success: true,
      message: "Login realizado com sucesso!",
      user: userWithoutPassword as User,
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return { success: false, message: "Erro interno do servidor" }
  }
}
