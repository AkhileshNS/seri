
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
 init: one Literal
}

sig Identifier {
   name: one String
}

sig Literal {
   value: one String,
 raw: one String
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
one sig Program_0 extends Program {} {
  body = 0->VariableDeclaration_0 + 1->ExpressionStatement_0
  sourceType = "script"
}
one sig VariableDeclaration_0 extends VariableDeclaration {} {
  declarations = 0->VariableDeclarator_0
  kind = "const"
}
one sig VariableDeclarator_0 extends VariableDeclarator {} {
  id = Identifier_1
  init = Literal_1
}
one sig Identifier_0 extends Identifier {} {
  name = "a"
}
one sig Identifier_1 extends Identifier {} {
  name = "a"
}
one sig Literal_0 extends Literal {} {
  value = "1"
  raw = "1"
}
one sig Literal_1 extends Literal {} {
  value = "1"
  raw = "1"
}
one sig ExpressionStatement_0 extends ExpressionStatement {} {
  expression = AssignmentExpression_0
}
one sig AssignmentExpression_0 extends AssignmentExpression {} {
  operator = "="
  left = Identifier_0
  right = Literal_0
}
/* --- INVARIANTS --- */
pred invariants {
no element:Program | element not in {Program_0}
no element:VariableDeclaration | element not in {VariableDeclaration_0}
no element:VariableDeclarator | element not in {VariableDeclarator_0}
no element:Identifier | element not in {Identifier_0 + Identifier_1}
no element:Literal | element not in {Literal_0 + Literal_1}
no element:ExpressionStatement | element not in {ExpressionStatement_0}
no element:AssignmentExpression | element not in {AssignmentExpression_0}
}

run with invariants
  