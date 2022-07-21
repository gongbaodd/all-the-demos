#include "border.h"

Border::Border(const wxString &title)
    : wxFrame(NULL, wxID_ANY, title, wxPoint(-1, -1), wxSize(250, 200))
{
    wxColor col1, col2;
    col1.Set(wxT("#4f5049"));
    col2.Set(wxT("#ededed"));

    wxPanel *panel = new wxPanel(this, wxID_ANY);
    panel->SetBackgroundColour(col1);
    wxBoxSizer *vbox = new wxBoxSizer(wxVERTICAL);

    wxPanel *midPan = new wxPanel(panel, wxID_ANY);
    midPan->SetBackgroundColour(col2);

    vbox->Add(midPan, 1, wxEXPAND | wxALL, 20);
    panel->SetSizer(vbox);

    Center();
}