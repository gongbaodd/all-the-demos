#include <wx/wx.h>
#include "textdrop.h"

class MyApp : public wxApp
{
public:
    virtual bool OnInit();
};

IMPLEMENT_APP(MyApp);

bool MyApp::OnInit()
{
    TextDrop *frame = new TextDrop(wxT("TextDrop"));
    frame->Show(true);
    return true;
}