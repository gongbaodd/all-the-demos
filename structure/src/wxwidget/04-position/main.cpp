#include "absolute.h"
#include "sizer.h"
#include "border.h"
#include "align.h"
#include "gotoclass.h"

class MyApp : public wxApp
{
public:
    virtual bool OnInit();
};

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{
    // Sizer *frame = new Sizer(wxT("Sizer"));
    // frame->Show(true);

    // Border *frame = new Border(wxT("Border"));
    // frame->Show(true);

    // Align *frame = new Align(wxT("Align"));
    // frame->Show(true);

    GotoClass *frame = new GotoClass(wxT("GotoClass"));
    frame->Show(true);

    return true;
}
