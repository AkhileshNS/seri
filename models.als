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
one sig P1 extends Program {} {
  sourceType = "script"
  body = 0->I1 + 1->I2
}

one sig D1 extends VariableDeclarator {} {
  id = Id1
  init = Li1
}

one sig AE1 extends AssignmentExpression {} {
  operator = "="
  left = Id2
  right = Li2
}

one sig I2 extends ExpressionStatement {} {
  expression = AE1
}

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

one sig I1 extends VariableDeclaration {} {
  kind = "let"
  declarations = 0->D1
}

/* --- INVARIANTS --- */
pred invariants {
  no P:Program              | P not in {P1}
  no V:VariableDeclaration  | V not in {I1}
  no V:VariableDeclarator   | V not in {D1}
  no A:AssignmentExpression | A not in {AE1}
  no E:ExpressionStatement  | E not in {I2}
  no I:Identifier           | I not in {Id1 + Id2}
  no L:Literal              | L not in {Li1 + Li2} 
}

/* --- ASSERTIONS --- */
assert ConstantsNeverChange {
  invariants => (
    // Start working ON Assertion here
      all V:VariableDeclaration, L:VariableDeclarator | V.kind = "const" => (
        all AE:AssignmentExpression | AE.operator = "=" and not (AE.left.name = L.id.name))
  )
}

check ConstantsNeverChange

/* --- RUNS --- */
run with invariants