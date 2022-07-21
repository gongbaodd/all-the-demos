
#include "menu.h"
#include "toolbar.h"
#include "main.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{
    // SimpleMenu *menu = new SimpleMenu(wxT("simple Menu"));
    // SubMenu *menu = new SubMenu(wxT("submenu"));
    // menu->Show(true);

    Toolbar *toolbar = new Toolbar(wxT("toolbar"));
    toolbar->Show(true);

    return true;
}