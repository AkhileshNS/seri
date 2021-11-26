/* --- SIGNATURES --- */
sig Program {
  sourceType: one String,
  body: seq VariableDeclaration + ExpressionStatement
}

sig VariableDeclaration {
  kind: one String,
  declarations: seq VariableDeclarator
}

sig VariableDeclarator {
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

sig ExpressionStatement {
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

one sig I1 extends VariableDeclaration {} {
  kind = "let"
  declarations = 0->D1
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
    all V:VariableDeclaration | V.kind in {"let" + "const"}
  )
}

check ConstantsNeverChange

/* --- RUNS --- */
run with invariants