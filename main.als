/**
  * @Context types
  * Init-Constant - "const b = 1;" 
  * Init-Variable - "let b = 1;"
  * Set-Value - "b = 1";
  */

// @Start:Predefined "Signatures"
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
// @End:Predefined

// @Start:Predefined "Predicates & Functions"
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
// @End:Prefined

// @Start:Generated
one sig L1 extends Line {}{
  context = "Init-Constant"
  name = "num"
  value = "2"
  type = "number"
}

one sig L2 extends Line {}{
  context = "Init-Variable"
  name = "age"
  value = "21"
  type = "number"
}

one sig L3 extends Line {}{
  context = "Init-Variable"
  name = "name"
  value = "\"Akhilesh\""
  type = "string"
}

one sig L4 extends Line {}{
  context = "Set-Value"
  name = "name"
  value = "\"Akhilesh1\""
  type = "string"
}

pred execute[e:Execution] {
  exists[e, L1 + L2 + L3 + L4]
}
// @End:Generated

// @Start:Predefined "Assertions"
assert ConstantsNeverChange {
  all e:Execution | execute[e] => (
    all l:e.lines.elems | l.context = "Init-Constant" => (
      no l2:e.lines.elems - l | l2.context = "Set-Value" and l2.name = l.name
    ) 
  )
}

check ConstantsNeverChange
// @End:Predefined

// run addLines
run execute