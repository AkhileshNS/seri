/* --- SIGNATURES --- */
sig Program {
  sourceType: one String,
  body: seq Instruction
}

sig Instruction {}

sig VariableDeclaration extends Instruction {
  kind: one String,
  declarations: seq Declaration
}

sig Declaration {} 

sig VariableDeclarator extends Declaration {
  id: one Identifier,
  init: one Literal,
}

sig Identifier {
  name: one String
}

sig Literal {
  value: one Value,
  raw: one String,
}

sig Value {}

sig ExpressionStatement extends Instruction {
  expression: one AssignmentExpression
}

sig AssignmentExpression {
  operator: one String,
  left: one Identifier,
  right: one Literal
}

/* --- SINGLETONS --- */
one sig P1 extends Program {} {
  sourceType = "script"
  body = 1->I1 + 2->I2
}

one sig I1 extends VariableDeclaration {} {
  kind = "const"
  declarations = 1->D1
}

one sig D1 extends VariableDeclarator {} {
  id = Id1
  init = Li1
}

one sig Id1 extends Identifier {} {
  name = "a"
}

one sig Li1 extends Literal {} {
  value = V1
  raw = "1"
}

one sig V1 extends Value {} {}

one sig I2 extends ExpressionStatement {} {
  expression = AE1
}

one sig AE1 extends AssignmentExpression {} {
  operator = "="
  left = Id2
  right = Li2
}

one sig Id2 extends Identifier {} {
  name = "a"
}

one sig Li2 extends Literal {} {
  value = V2
  raw = "2"
}

one sig V2 extends Value {} {}