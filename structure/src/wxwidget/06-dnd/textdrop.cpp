#include "textdrop.h"

TextDrop::TextDrop(const wxString &title)
    : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(300, 200))
{
    Center();
}