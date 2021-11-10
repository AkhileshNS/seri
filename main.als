// @Predefined "Signatures"
// abstract sig Context {}
// one sig InitConstant extends Context {}

abstract sig Line {
  context: String,
  name: String,
  value: String,
  type: String
}

sig Execution {
  lines: seq Line
}
// @End

// @Predefined "Predicates & Functions"
/* pred addLines[e,e':Execution, ls:set Line] {
  // PRE
  all l:ls | #e.lines.indsOf[l] = 0  
  // POST
  some lse:seq Line {
    // PRE
    all l:lse.elems | #e.lines.indsOf[l] > 0 and l in ls
    // POST
    e'.lines = lse
  }
} */

pred exists[e:Execution, ls:set Line] {
  all l:ls | #e.lines.indsOf[l]>0
}
// @End

// @Generated
one sig L1 extends Line {}{
  context = "Init-Constant"
  name = "a"
  value = "1"
  type = "number"
}
one sig L2 extends Line {}{
  context = "Init-Constant"
  name = "b"
  value = "\"Hello\""
  type = "string"
}
one sig L3 extends Line {}{
  context = "Init-Constant"
  name = "c"
  value = "false"
  type = "boolean"
}

pred execute[e:Execution] {
  exists[e, L1 + L2 + L3]
}
// @End

// @Predefined "Assertions"
assert ConstantsNeverChange {
  all e:Execution | execute[e] => (
    all l:e.lines.elems | l.name != "Init-Constant"
  )
}

check ConstantsNeverChange
// @End

// run addLines
run execute