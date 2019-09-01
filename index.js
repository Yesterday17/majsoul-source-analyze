import { format } from 'prettier'

export default code => {
  const codeAll = {}
  const formatted = format(code, {
    semi: true,
    arrowParens: 'avoid',
    singleQuote: true,
    tabWidth: 2,
    endOfLine: 'lf',
    parser: 'babel'
  })

  const majsoulStart = formatted.indexOf('var uiscript;')
  const majsoulCode = formatted.substr(majsoulStart)
  codeAll['laya'] = formatted.substr(0, majsoulStart)

  codeAll['majsoul'] = majsoulCode
    .split('\nvar')
    .map((code, index) => (index === 0 ? code : 'var' + code))

  return codeAll
}
