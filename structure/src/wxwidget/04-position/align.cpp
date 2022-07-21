#include "align.h"

Align::Align(const wxString &title)
    : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(300, 200))
{
    Center();

    wxPanel *panel = new wxPanel(this, wxID_ANY);

    wxBoxSizer *vbox = new wxBoxSizer(wxVERTICAL);
    wxBoxSizer *hbox1 = new wxBoxSizer(wxHORIZONTAL);
    wxBoxSizer *hbox2 = new wxBoxSizer(wxHORIZONTAL);

    wxButton *ok = new wxButton(panel, wxID_OK, wxT("OK"));
    wxButton *cancel = new wxButton(panel, wxID_CANCEL, wxT("Cancel"));

    hbox1->Add(new wxPanel(panel, wxID_ANY));
    vbox->Add(hbox1, 1, wxEXPAND);

    hbox2->Add(ok);
    hbox2->Add(cancel);

    vbox->Add(hbox2, 0, wxALIGN_RIGHT | wxRIGHT | wxBOTTOM, 10);
    panel->SetSizer(vbox);
}