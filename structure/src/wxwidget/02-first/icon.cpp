#include "icon.h"

Icon::Icon(const wxString &title)
    : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(250, 250))
{
    SetIcon(wxIcon(wxT("web.xpm")));
    Center();
}