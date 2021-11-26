/* --- SIGNATURES --- */
sig Program {
  sourceType: one String,
  body: seq Instruction
}

abstract sig Instruction {}

sig VariableDeclaration extends Instruction {
  kind: one String,
  declarations: seq Declaration
}

abstract sig Declaration {}

sig VariableDeclarator extends Declaration {
  id: one Identifier,
  init: one Literal,
}

sig Identifier {
  name: one String
}

sig Literal {
  value: one String,
  raw: one String,
}

sig ExpressionStatement extends Instruction {
  expression: one AssignmentExpression
}

sig AssignmentExpression {
  operator: one String,
  left: one Identifier,
  right: one Literal
}

/* --- SINGLETONS --- */
one sig Id1 extends Identifier {} {
  name = "a"
}

one sig Li1 extends Literal {} {
  value = "1"
  raw = "1"
}

one sig Id2 extends Identifier {} {
  name = "a"
}

one sig Li2 extends Literal {} {
  value = "2"
  raw = "2"
}

one sig D1 extends VariableDeclarator {} {
  id = Id1
  init = Li1
}

fun I1declarations : seq Declaration {
  1->D1
}

one sig I1 extends VariableDeclaration {} {
  kind = "const"
  declarations = I1declarations
}

one sig AE1 extends AssignmentExpression {} {
  operator = "="
  left = Id2
  right = Li2
}

one sig I2 extends ExpressionStatement {} {
  expression = AE1
}

fun P1body : seq Instruction {
  1->I1 + 2->I2
} 

one sig P1 extends Program {} {
  sourceType = "script"
  body = P1body
}

// */

run {}