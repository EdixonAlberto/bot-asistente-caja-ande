type TConfig = {
  port: number
  debug: boolean
  wassi: {
    apiUrl: string
    token: string
    device: string
  }
  ande: {
    apiUrl: string
  }
  modeAPP: 'API' | 'BOT'
  timerSessionMin: number
  messageSession: boolean
}

type TConfigHttpClient = {
  baseURL: string
  defaultPath: string
  timeoutSecond?: number
  headers?: import('axios').AxiosRequestHeaders
}

type TDataController = {
  phone: string
  message: string
  res: import('express').Response
  menuHome: string
}

type TEnv = 'development' | 'production'

type TSession = {
  phone: string
  treeLevel: TLevel
  option: string
  treeStep: TStep
  ande: TAnde
  store: TStore
}

type TAnde = null | {
  affiliate: TAffiliate
  token: string
}

type TStore = {
  lendingSpecial: {
    payload: {
      type: TTypeLending
      deadlineList: TDeadline[]
      deadline: TDeadline
      payMethodList: TAndeResponse['formacobro']
      payMethod: TAndeResponse['formacobro'][0]
    }
    body: TAndeBody['solicitudcredito']
  }
  creditCard: {
    body: {
      lineaCredito: number
    }
  }
}

type TLevel =
  | 'MAIN'
  | 'MESA'
  | 'LOGIN'
  | 'HOME'
  | 'CREDIT_CARD'
  | 'LENDING_QUERY'
  | 'NEWS'
  | 'PERSONAL_DATA'
  | 'DOWNLOAD'
  | 'LINKS'
  | 'ENTRY_TABLE'
  | 'LENDINGS'

type TStep = '' | 'STEP_1' | 'STEP_2' | 'STEP_3' | 'STEP_4' | 'STEP_5' | 'STEP_6'

type TWassiData = TWassiBody['data']

type TTypeLending = 'paralelo' | 'cancelacion' | 'student' | 'extraordinary'

// DECLARATIONS ________________________________________________________________________________________________________

// Base de datos temporal
declare var SESSIONS: TSession[]
declare var ANDE: TAnde
declare var STORE: TStore

declare var TREE_LEVEL: TLevel
declare var TREE_OPTION: string
declare var TREE_STEP: TStep
