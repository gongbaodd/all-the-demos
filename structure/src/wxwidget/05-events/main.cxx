#include "button.h"

class MyApp : public wxApp
{
public:
    virtual bool OnInit();
};

IMPLEMENT_APP(MyApp);

bool MyApp::OnInit()
{
    MyButton *btn = new MyButton(wxT("Button"));
    btn->Show(true);

    return true;
}