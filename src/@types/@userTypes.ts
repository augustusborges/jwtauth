export interface user {
  id?: string
  first_name: string
  last_name: string
  email: string
  password: string
  token?: string
}

export interface usuario {
  id?: string
  nome: string
  sobrenome: string
  email: string
  senha: string
  token?: string
  papel: papel["id"]
}
export interface papel {
  id?: string
  nome: string
  descricao: string
}
