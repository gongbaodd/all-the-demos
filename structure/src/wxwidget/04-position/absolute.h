#ifndef __ABSOLUTE_H__
#define __ABSOLUTE_H__

#include <wx/wx.h>

class Absolute : public wxFrame
{
public:
    Absolute(const wxString &title);

    wxMenuBar *menubar;
    wxMenu *file;
    wxMenu *edit;
    wxMenu *help;
    wxTextCtrl *textctrl;
};

#endif