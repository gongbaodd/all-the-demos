#include "sizer.h"

Sizer::Sizer(const wxString &title)
    : wxFrame(NULL, wxID_ANY, title, wxPoint(-1, -1), wxSize(250, 180))
{
    menuBar = new wxMenuBar();
    file = new wxMenu();
    edit = new wxMenu();
    help = new wxMenu();

    menuBar->Append(file, wxT("&File"));
    menuBar->Append(edit, wxT("&Edit"));
    menuBar->Append(help, wxT("&Help"));
    SetMenuBar(menuBar);

    textctrl = new wxTextCtrl(this, wxID_ANY, wxT(""), wxPoint(-1, -1), wxSize(250, 150));

    Centre();
}