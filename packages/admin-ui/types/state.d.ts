interface BootState{
  status:BootProps["status"];
  menus:TreeProps["dataSource"];
}

interface GuardState{
  status:"idle"|"loginstart"|"loginend"|"loginfailed";
}

interface UsrState{
  pending:boolean;
}

interface AppState{
  usr:UsrState;
  guard:GuardState;
  boot:BootState;
}