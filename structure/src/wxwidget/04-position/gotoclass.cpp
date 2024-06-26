#include "gotoclass.h"

GotoClass::GotoClass(const wxString &title)
    : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(450, 400))
{
    wxPanel *panel = new wxPanel(this, wxID_ANY);

    wxBoxSizer *vbox = new wxBoxSizer(wxVERTICAL);

    wxBoxSizer *hbox1 = new wxBoxSizer(wxHORIZONTAL);
    wxStaticText *st1 = new wxStaticText(panel, wxID_ANY, wxT("Class name:"));

    hbox1->Add(st1, 0, wxRIGHT, 8);
    wxTextCtrl *tc1 = new wxTextCtrl(panel, wxID_ANY);
    hbox1->Add(tc1, 1);
    vbox->Add(hbox1, 0, wxEXPAND | wxLEFT | wxRIGHT | wxTOP, 10);

    vbox->Add(-1, 10);

    wxBoxSizer *hbox2 = new wxBoxSizer(wxHORIZONTAL);
    wxStaticText *st2 = new wxStaticText(panel, wxID_ANY, wxT("Matching Classes:"));

    hbox2->Add(st2, 0);
    vbox->Add(hbox2, 0, wxLEFT | wxTOP, 10);

    vbox->Add(-1, 10);

    wxBoxSizer *hbox3 = new wxBoxSizer(wxHORIZONTAL);
    wxTextCtrl *tc2 = new wxTextCtrl(panel, wxID_ANY, wxEmptyString, wxDefaultPosition, wxSize(-1, -1), wxTE_MULTILINE);

    hbox3->Add(tc2, 1, wxEXPAND);
    vbox->Add(hbox3, 1, wxLEFT | wxRIGHT | wxEXPAND, 10);

    vbox->Add(-1, 25);

    wxBoxSizer *hbox4 = new wxBoxSizer(wxHORIZONTAL);

    wxCheckBox *cb1 = new wxCheckBox(panel, wxID_ANY, wxT("Case sensitive"));
    hbox4->Add(cb1, 0, wxLEFT, 10);

    wxCheckBox *cb2 = new wxCheckBox(panel, wxID_ANY, wxT("Nested Classes"));
    hbox4->Add(cb2, 0, wxLEFT, 10);

    wxCheckBox *cb3 = new wxCheckBox(panel, wxID_ANY, wxT("Non-Project Classes"));
    hbox4->Add(cb3, 0, wxLEFT, 10);

    vbox->Add(hbox4, 0, wxLEFT, 10);

    vbox->Add(-1, 25);

    wxBoxSizer *hbox5 = new wxBoxSizer(wxHORIZONTAL);
    wxButton *btn1 = new wxButton(panel, wxID_ANY, wxT("OK"));
    hbox5->Add(btn1, 0);
    wxButton *btn2 = new wxButton(panel, wxID_ANY, wxT("Close"));
    hbox5->Add(btn2, 0, wxLEFT | wxBOTTOM, 5);
    vbox->Add(hbox5, 0, wxALIGN_RIGHT | wxRIGHT, 10);

    panel->SetSizer(vbox);

    Center();
}