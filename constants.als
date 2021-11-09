sig Constant {}
sig State {
  action: "init" | "set"
  receiver: set Constant
}
sig Progam {
  states: seq State 
}{
  states = <>
}