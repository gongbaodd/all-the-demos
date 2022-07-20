#include "main.h"
#include "simple.h"
#include "icon.h"
#include "button.h"
#include "panels.h"
#include "communicate.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{
    // Simple *simple = new Simple(wxT("Simple"));
    // simple->Show(true);

    // Icon *icon = new Icon(wxT("Icon"));
    // icon->Show(true);

    // Button *btnapp = new Button(wxT("Button"));
    // btnapp->Show(true);

    Communicate *comm = new Communicate(wxT("Communicate"));
    comm->Show(true);

    return true;
}