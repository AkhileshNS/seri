// @Predefined "Signatures"
sig Context {}
sig InitConstant extends Context {}

sig Line {
  // context
  // name
  // value
  // type
  context: Context,
  name: String,
  value: String,
  type: String
}{
  name = "UNDEFINED"
  value = "UNDEFINED"
  type = "UNDEFINED"
}

sig Execution {
  lines: seq Line
}
// @End

// @Predefined "Predicates & Functions"
fun createConstant[name,value,type:String]: Line {
  {l:Line | l.name = name and l.value = value and l.type = type and l.context in InitConstant}
}

pred addLine[e,e':Execution, l:Line] {
  // PRE
  #e.lines.indsOf[l] = 0  
  // POST
  e'.lines = e.lines.add[l]
}
// @End

run addLine
run {}