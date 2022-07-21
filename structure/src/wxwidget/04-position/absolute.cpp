#include "absolute.h"

Absolute::Absolute(const wxString &title)
    : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(350, 250))
{
    wxPanel *panel = new wxPanel(this, -1);

    menubar = new wxMenuBar();
    file = new wxMenu();
    edit = new wxMenu();
    help = new wxMenu();

    menubar->Append(file, wxT("&File"));
    menubar->Append(file, wxT("&Edit"));
    menubar->Append(file, wxT("&Help"));

    SetMenuBar(menubar);

    textctrl = new wxTextCtrl(panel, wxID_ANY, wxT(""),
                              wxDefaultPosition, wxSize(250, 150),
                              wxTE_MULTILINE);
}