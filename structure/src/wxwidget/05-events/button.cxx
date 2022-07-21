#include "button.h"

MyButton::MyButton(const wxString &title)
    : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(270, 150))
{
    wxPanel *panel = new wxPanel(this, wxID_ANY);
    wxButton *btn = new wxButton(panel, wxID_EXIT, wxT("Quit"), wxPoint(20, 20));
    Center();
}

void MyButton::OnQuit(wxCommandEvent &event)
{
    Close(true);
}

BEGIN_EVENT_TABLE(MyButton, wxFrame)
EVT_BUTTON(wxID_EXIT, MyButton::OnQuit)
END_EVENT_TABLE()